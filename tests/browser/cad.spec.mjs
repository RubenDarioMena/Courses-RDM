import { test as base, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const storageKey = 'taller-cad.document.v1';
const initialVolume = 60 * 40 * 8 - Math.PI * 6 ** 2 * 8;
const editedVolume = 80 * 40 * 8 - Math.PI * 6 ** 2 * 8;

// Un fallo JavaScript de la página debe fallar aunque su interfaz parezca lista.
const test = base.extend({
  runtimeErrors: [async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await use(errors);
    expect(errors, 'La aplicación no debe producir excepciones sin manejar.').toEqual([]);
  }, { auto: true }],
});

async function ready(page) {
  await expect(page.locator('#engine-status')).toContainText('OpenCascade · listo');
  await expect(page.locator('#loading-overlay')).toBeHidden();
  await expect(page.locator('#new-project')).toBeEnabled();
}

async function openEditor(page) {
  const response = await page.goto('/cad/');
  expect(response.status()).toBe(200);
  await ready(page);
}

async function storedDocument(page) {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey);
}

async function selectedVolume(page) {
  const text = await page.locator('.stats-card strong').textContent();
  return Number(text.replace(/[^0-9.\-]/g, ''));
}

async function selectSupport(page) {
  await page.locator('.object-select[data-id="soporte"]').click();
  await expect(page.locator('#selection-label')).toHaveText('Soporte con agujero');
}

async function saveDownload(page, testInfo, click, name) {
  const pending = page.waitForEvent('download');
  await click();
  const download = await pending;
  const path = testInfo.outputPath(name);
  await download.saveAs(path);
  expect(await download.failure()).toBeNull();
  return { download, path, data: await readFile(path) };
}

test('el editor carga OpenCascade sin cuenta y conserva la portada y Arena', async ({ page, request, context }) => {
  await openEditor(page);
  await expect(page).toHaveTitle(/Taller CAD/);
  await expect(page.locator('#object-list .object-select')).toHaveCount(3);
  await expect(page.locator('#viewport canvas')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  expect(await context.cookies()).toEqual([]);
  await selectSupport(page);
  expect(await selectedVolume(page)).toBeCloseTo(initialVolume, 1);
  for (const path of ['/', '/arena/']) {
    const response = await request.get(path);
    expect(response.status(), `${path} debe seguir disponible.`).toBe(200);
    expect(response.headers()['content-type']).toContain('text/html');
  }
});

test('editar una fuente oculta reconstruye el soporte y permite deshacer y rehacer', async ({ page }) => {
  await openEditor(page);
  await page.locator('.object-select[data-id="base"]').click();
  await page.locator('#param-width').fill('80');
  await page.getByRole('button', { name: 'Aplicar cambios', exact: true }).click();
  await expect(page.locator('#message')).toHaveText('Medidas actualizadas.');
  await ready(page);
  await selectSupport(page);
  expect(await selectedVolume(page)).toBeCloseTo(editedVolume, 1);
  expect((await storedDocument(page)).objects.find((object) => object.id === 'base').params.width).toBe(80);
  await page.locator('#undo').click();
  await expect(page.locator('#message')).toHaveText('Operación deshecha.');
  await ready(page);
  expect(await selectedVolume(page)).toBeCloseTo(initialVolume, 1);
  await page.locator('#redo').click();
  await expect(page.locator('#message')).toHaveText('Operación rehecha.');
  await ready(page);
  expect(await selectedVolume(page)).toBeCloseTo(editedVolume, 1);
  expect((await storedDocument(page)).objects.find((object) => object.id === 'base').params.width).toBe(80);
});

test('un perfil de 40 × 30 extruido 12 mm produce un sólido de 14400 mm³', async ({ page }) => {
  await openEditor(page);
  await page.locator('#new-project').click();
  await expect(page.locator('#message')).toContainText('Proyecto nuevo.');
  await ready(page);
  await page.locator('#sketch-button').click();
  await expect(page.locator('#sketch-dialog')).toBeVisible();
  await page.locator('#sketch-rectangle').click();
  await expect(page.locator('#sketch-status')).toContainText('4 vértices');
  await page.locator('#sketch-height').fill('12');
  await page.locator('#sketch-create').click();
  await expect(page.locator('#message')).toHaveText('Perfil extruido.');
  await ready(page);
  expect(await selectedVolume(page)).toBe(14400);
  const saved = await storedDocument(page);
  expect(saved.objects).toHaveLength(1);
  expect(saved.objects[0].type).toBe('extrusion');
  expect(saved.objects[0].params).toMatchObject({ points: [[0, 0], [40, 0], [40, 30], [0, 30]], height: 12 });
});

test('un redondeo imposible conserva el proyecto y permite continuar editando', async ({ page }) => {
  await openEditor(page);
  const previous = await storedDocument(page);
  await page.locator('#fillet-button').click();
  const dialog = page.locator('#tool-dialog');
  await dialog.locator('select[name="source"]').selectOption('base');
  await dialog.locator('input[name="radius"]').fill('100');
  await dialog.getByRole('button', { name: 'Aplicar', exact: true }).click();
  await expect(page.locator('#message')).toContainText('radio menor');
  await expect(page.locator('#message')).toHaveClass(/error/);
  await ready(page);
  expect(await storedDocument(page)).toEqual(previous);
  await expect(page.locator('#object-list .object-select')).toHaveCount(3);
  await selectSupport(page);
  expect(await selectedVolume(page)).toBeCloseTo(initialVolume, 1);
  await page.locator('#sketch-button').click();
  await expect(page.locator('#sketch-dialog')).toBeVisible();
});

test('descarga STEP, STL y proyecto portable, vuelve a abrirlo y conserva el guardado al recargar', async ({ page }, testInfo) => {
  await openEditor(page);
  await page.locator('#document-name').fill('CAD portable Windows');
  await page.locator('#document-name').press('Tab');
  await expect(page.locator('#message')).toHaveText('Nombre del proyecto actualizado.');
  await ready(page);
  const project = await saveDownload(page, testInfo, () => page.locator('#save-project').click(), 'proyecto.cad.json');
  expect(project.download.suggestedFilename()).toBe('CAD-portable-Windows.cad.json');
  expect(JSON.parse(project.data.toString('utf8'))).toEqual(await storedDocument(page));
  const files = new Map();
  for (const format of ['step', 'stl']) {
    await page.locator('#export-button').click();
    const file = await saveDownload(page, testInfo, () => page.locator(`[data-export="${format}"]`).click(), `pieza.${format}`);
    await expect(page.locator('#message')).toHaveText(`Archivo ${format.toUpperCase()} exportado.`);
    await ready(page);
    expect(file.download.suggestedFilename()).toBe(`CAD-portable-Windows.${format}`);
    files.set(format, file);
  }
  expect(files.get('step').data.toString('utf8')).toMatch(/^ISO-10303-21;/);
  const stl = files.get('stl').data;
  const triangles = stl.readUInt32LE(80);
  expect(triangles).toBeGreaterThan(12);
  expect(stl.length).toBe(84 + triangles * 50);
  await page.locator('#new-project').click();
  await expect(page.locator('#message')).toContainText('Proyecto nuevo.');
  await ready(page);
  await expect(page.locator('#object-list .object-select')).toHaveCount(0);
  const chooserPromise = page.waitForEvent('filechooser');
  await page.locator('#open-project').click();
  await (await chooserPromise).setFiles(project.path);
  await expect(page.locator('#message')).toContainText('abierto.');
  await ready(page);
  await expect(page.locator('#document-name')).toHaveValue('CAD portable Windows');
  await selectSupport(page);
  expect(await selectedVolume(page)).toBeCloseTo(initialVolume, 1);
  await page.reload();
  await ready(page);
  await expect(page.locator('#document-name')).toHaveValue('CAD portable Windows');
  await expect(page.locator('#object-list .object-select')).toHaveCount(3);
  expect(await storedDocument(page)).toEqual(JSON.parse(project.data.toString('utf8')));
  await selectSupport(page);
  expect(await selectedVolume(page)).toBeCloseTo(initialVolume, 1);
});

test('reabre STEP y un STL exportado de miles de triángulos sin reconstruir caras por triángulo', async ({ page }, testInfo) => {
  await openEditor(page);
  await page.locator('#sketch-button').click();
  await page.locator('#sketch-rectangle').click();
  await page.locator('#sketch-height').fill('12');
  await page.locator('#sketch-create').click();
  await expect(page.locator('#message')).toHaveText('Perfil extruido.');
  await ready(page);
  await page.locator('#fillet-button').click();
  const dialog = page.locator('#tool-dialog');
  await dialog.locator('input[name="radius"]').fill('1');
  await dialog.getByRole('button', { name: 'Aplicar', exact: true }).click();
  await expect(page.locator('#message')).toHaveText('Redondeo creado.');
  await ready(page);
  const volume = initialVolume + await selectedVolume(page);
  const files = new Map();
  for (const format of ['step', 'stl']) {
    await page.locator('#export-button').click();
    const file = await saveDownload(page, testInfo, () => page.locator(`[data-export="${format}"]`).click(), `conjunto.${format}`);
    await expect(page.locator('#message')).toHaveText(`Archivo ${format.toUpperCase()} exportado.`);
    await ready(page);
    files.set(format, file);
  }
  expect(files.get('stl').data.readUInt32LE(80)).toBeGreaterThanOrEqual(3000);
  for (const format of ['step', 'stl']) {
    await page.locator('#new-project').click();
    await expect(page.locator('#message')).toContainText('Proyecto nuevo.');
    await ready(page);
    const chooserPromise = page.waitForEvent('filechooser');
    await page.locator('#open-project').click();
    const started = Date.now();
    await (await chooserPromise).setFiles(files.get(format).path);
    await expect(page.locator('#message')).toContainText('abierto.');
    await ready(page);
    await expect(page.locator('#object-list .object-select')).toHaveCount(1);
    const imported = await storedDocument(page);
    expect(imported.objects[0]).toMatchObject({ type: 'import', params: { format } });
    if (format === 'step') expect(await selectedVolume(page)).toBeCloseTo(volume, 1);
    else {
      expect(Date.now() - started, 'La malla de miles de triángulos debe abrirse sin reconstruir miles de caras BRep.').toBeLessThan(10_000);
      await expect(page.locator('.stats-card')).toHaveCount(0);
      await expect(page.locator('#inspector-content')).toContainText(/malla/i);
      await page.locator('#fillet-button').click();
      await page.locator('#tool-dialog').getByRole('button', { name: 'Aplicar', exact: true }).click();
      await expect(page.locator('#message')).toContainText('STL son mallas');
      await ready(page);
      expect(await storedDocument(page)).toEqual(imported);
    }
  }
});

test('una geometría local inválida se recupera sin perder el archivo anterior', async ({ page }, testInfo) => {
  // Fixture declarativo: archivo válido para el modelo, imposible para el núcleo.
  const invalid = { version: 1, name: 'Redondeo imposible guardado', objects: [
    { id: 'base', name: 'Bloque de origen', type: 'box', params: { width: 20, depth: 30, height: 10, x: 0, y: 0, z: 0 }, visible: false, color: '#56b6ff' },
    { id: 'redondeo', name: 'Radio imposible', type: 'fillet', params: { source: 'base', radius: 100 }, visible: true, color: '#56b6ff' },
  ] };
  await page.addInitScript(({ key, value }) => {
    if (localStorage.getItem(key) === null) localStorage.setItem(key, value);
  }, { key: storageKey, value: JSON.stringify(invalid) });
  await openEditor(page);
  await expect(page.locator('#message')).toContainText('La geometría guardada no se pudo reconstruir.');
  await expect(page.locator('#document-name')).toHaveValue('Proyecto recuperado');
  await expect(page.locator('#recover-project')).toBeVisible();
  await expect(page.locator('#object-list .object-select')).toHaveCount(0);
  const recovery = await saveDownload(page, testInfo, () => page.locator('#recover-project').click(), 'copia-anterior.cad.json');
  expect(JSON.parse(recovery.data.toString('utf8'))).toEqual(invalid);
  expect(await storedDocument(page)).toMatchObject({ name: 'Proyecto recuperado', objects: [] });
  await page.reload();
  await ready(page);
  await expect(page.locator('#document-name')).toHaveValue('Proyecto recuperado');
  await expect(page.locator('#recover-project')).toBeVisible();
});

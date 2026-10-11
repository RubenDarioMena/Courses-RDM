"""Bounded educational executor shared by CPython tests and the browser worker.

This is an exercise runner, not a security boundary for untrusted Python.
The browser also runs it in a disposable worker with a wall-clock deadline.
"""
import ast
import builtins
import json
import math
import sys

MAX_LINES = 4000
MAX_FRAMES = 180
ALLOWED_NODES = {
    "Module", "Expr", "Assign", "AugAssign", "Name", "Load", "Store", "Constant",
    "Call", "Attribute", "List", "Tuple", "Dict", "Set", "Subscript", "Slice",
    "BinOp", "UnaryOp", "BoolOp", "Compare", "If", "IfExp", "While", "For",
    "Break", "Continue", "Pass", "JoinedStr", "FormattedValue", "Add", "Sub",
    "Mult", "Div", "FloorDiv", "Mod", "Pow", "USub", "UAdd", "Not", "And",
    "Or", "Eq", "NotEq", "Lt", "LtE", "Gt", "GtE", "In", "NotIn", "keyword",
}
ALLOWED_METHODS = {"append", "remove", "pop", "sort", "reverse", "upper", "lower", "strip", "replace", "join", "count", "index", "startswith", "endswith", "split"}
SAFE_BUILTINS = {name: getattr(builtins, name) for name in ("int", "float", "str", "bool", "len", "range", "min", "max", "abs", "round", "sum", "sorted", "list", "enumerate", "zip")}


def snapshot(value, depth=0):
    if depth > 4:
        return "…"
    if isinstance(value, str):
        return value[:500]
    if isinstance(value, float) and not math.isfinite(value):
        return str(value)
    if value is None or isinstance(value, (int, float, bool)):
        return value
    if isinstance(value, (list, tuple)):
        return [snapshot(v, depth + 1) for v in value[:30]]
    if isinstance(value, dict):
        return {str(k)[:100]: snapshot(v, depth + 1) for k, v in list(value.items())[:30]}
    return f"<{type(value).__name__}>"


def validate(source, required=(), concept_level=None):
    tree = ast.parse(source, filename="main.py")
    found = set()
    for node in ast.walk(tree):
        name = type(node).__name__
        found.add(name)
        if name not in ALLOWED_NODES:
            raise ValueError(f"{name} todavía no forma parte de esta Arena. Usa los conceptos de la misión.")
        if isinstance(node, ast.Name) and node.id.startswith("_"):
            raise ValueError("Usa nombres de variables que no comiencen con guion bajo.")
        if isinstance(node, ast.Attribute) and node.attr not in ALLOWED_METHODS:
            raise ValueError(f"El método {node.attr} todavía no está disponible en esta Arena.")
        if concept_level is not None:
            gates = {"Assign": 1, "AugAssign": 2, "BinOp": 2, "Attribute": 4,
                     "Compare": 5, "BoolOp": 5, "If": 6, "IfExp": 6,
                     "List": 7, "Subscript": 7, "Slice": 7, "While": 8, "For": 9}
            if concept_level < gates.get(name, 0) or name in {"Dict", "Set", "Tuple", "JoinedStr", "FormattedValue"}:
                raise ValueError(f"La variante utiliza {name}, un concepto que todavía no se ha presentado.")
            if isinstance(node, ast.Call) and isinstance(node.func, ast.Name):
                calls = {"print": 0, "str": 4, "int": 3, "float": 3, "input": 3, "len": 7, "range": 9}
                if node.func.id not in calls or concept_level < calls[node.func.id]:
                    raise ValueError(f"La variante utiliza {node.func.id}(), una función que todavía no se ha presentado.")
            if isinstance(node, ast.Attribute):
                methods = {"strip": 4, "upper": 4, "append": 7, "remove": 7, "sort": 7}
                if node.attr not in methods or concept_level < methods[node.attr]:
                    raise ValueError(f"La variante utiliza {node.attr}(), un método que todavía no se ha presentado.")
    missing = set(required) - found
    if missing:
        names = {"If": "if", "For": "for", "While": "while"}
        raise ValueError("En esta misión practica " + ", ".join(names.get(n, n) for n in sorted(missing)) + ".")
    return tree


def execute(payload):
    source = payload.get("source", "")
    watch = payload.get("watch", [])
    names = list(dict.fromkeys(watch + list(payload.get("context", {}).keys())))[:30]
    environment = dict(payload.get("context", {}))
    output = []
    frames = []
    responses = iter(payload.get("inputs", []))
    steps = 0
    output_size = 0
    error = None

    def capture_print(*args, sep=" ", end="\n"):
        nonlocal output_size
        text = sep.join(str(arg) for arg in args) + end
        output_size += len(text)
        if output_size > 5000:
            raise ValueError("La salida es demasiado larga. Revisa cuántas veces se ejecuta print().")
        output.append(text)

    def capture_input(prompt=""):
        if prompt:
            capture_print(prompt, end="")
        try:
            return str(next(responses))
        except StopIteration:
            raise ValueError("Falta una respuesta para input(). Añádela en Entradas, una por línea.") from None

    def describe():
        return {name: snapshot(environment[name]) for name in names if name in environment}

    def trace(frame, event, arg):
        nonlocal steps
        if frame.f_code.co_filename != "main.py":
            return trace
        if event == "line":
            steps += 1
            if steps > MAX_LINES:
                raise ValueError("El programa repitió demasiados pasos. Revisa que el bucle cambie su condición y pueda terminar.")
            if len(frames) < MAX_FRAMES:
                frames.append({"line": frame.f_lineno, "vars": describe(), "output": "".join(output)})
        return trace

    environment["__builtins__"] = {**SAFE_BUILTINS, "print": capture_print, "input": capture_input}
    try:
        if len(source) > 12000:
            raise ValueError("El programa es demasiado largo para esta misión.")
        tree = validate(source, payload.get("required", []), payload.get("conceptLevel"))
        sys.settrace(trace)
        exec(compile(tree, "main.py", "exec"), environment)
    except Exception as exc:
        line = getattr(exc, "lineno", None)
        tb = exc.__traceback__
        while tb:
            if tb.tb_frame.f_code.co_filename == "main.py":
                line = tb.tb_lineno
            tb = tb.tb_next
        error = f"{type(exc).__name__}" + (f" en línea {line}" if line else "") + f": {exc}"
    finally:
        sys.settrace(None)
    values = describe()
    frames.append({"line": None, "vars": values, "output": "".join(output)})
    return {"vars": values, "types": {n: type(environment[n]).__name__ for n in names if n in environment}, "output": "".join(output), "frames": frames, "steps": steps, "error": error, "traceTruncated": steps > MAX_FRAMES}


def arena_run_json(payload_json):
    payload = json.loads(payload_json)
    requests = payload if isinstance(payload, list) else [payload]
    return json.dumps([execute(request) for request in requests], ensure_ascii=False)


if __name__ == "__main__":
    print(arena_run_json(sys.stdin.read()))

#!/usr/bin/env python3
"""Erkennt den Instagram-Foto-Bereich in iPhone-Screenshots und croppt ihn."""
import os
import numpy as np
from PIL import Image

SRC = "/Users/jannikvomhofe/Desktop/Webdesign/Küchen Hargaßer/Bilder"
OUT = "/Users/jannikvomhofe/Desktop/Webdesign/Küchen Hargaßer/Crops"
os.makedirs(OUT, exist_ok=True)

def photo_rows(img):
    a = np.asarray(img.convert("RGB"), dtype=np.float32)
    h, w, _ = a.shape
    # Pro Zeile: Standardabweichung der Helligkeit + Farbsättigung
    gray = a.mean(axis=2)
    row_std = gray.std(axis=1)
    sat = a.max(axis=2) - a.min(axis=2)
    row_sat = sat.mean(axis=1)
    row_mean = gray.mean(axis=1)
    # UI-Zeile: sehr uniform und sehr hell (weißer Hintergrund) oder fast schwarz uniform
    is_ui = ((row_std < 18) & (row_mean > 235)) | ((row_std < 6) & (row_mean < 25))
    return ~is_ui, h, w

def largest_run(mask, max_gap=12):
    runs = []
    start = None
    gap = 0
    for i, v in enumerate(mask):
        if v:
            if start is None:
                start = i
            gap = 0
        else:
            if start is not None:
                gap += 1
                if gap > max_gap:
                    runs.append((start, i - gap))
                    start = None
    if start is not None:
        runs.append((start, len(mask) - 1))
    runs = [(s, e) for s, e in runs if e - s > 100]
    return max(runs, key=lambda r: r[1] - r[0]) if runs else None

for f in sorted(os.listdir(SRC)):
    if not f.upper().endswith(".PNG"):
        continue
    img = Image.open(os.path.join(SRC, f))
    mask, h, w = photo_rows(img)
    # Statusbar / Tabbar hart ausschließen
    mask[: int(h * 0.06)] = False
    mask[int(h * 0.97):] = False
    run = largest_run(mask)
    if not run:
        print(f"{f}: kein Foto-Bereich gefunden")
        continue
    top, bot = run
    crop = img.crop((0, top, w, bot + 1))
    out = os.path.join(OUT, f.replace(".PNG", "_crop.png"))
    crop.save(out)
    print(f"{f}: rows {top}-{bot}  ->  {crop.size[0]}x{crop.size[1]}")

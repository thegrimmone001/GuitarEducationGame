import { describe, expect, it } from "vitest";
import { createStaffTabOverlayState, getBlank3MeasureStaffTabLayout, renderStaffTabOverlay } from "../../src/shell/staffTabOverlay";

describe("ledger preview constraints", () => {
  it("creates clip paths and applies them so ledger lines cannot bleed into TAB", () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const layout = getBlank3MeasureStaffTabLayout(8);
    const state = createStaffTabOverlayState();

    renderStaffTabOverlay(svg as any, layout, state);

    const defs = svg.querySelector("defs");
    expect(defs).toBeTruthy();
    expect(svg.querySelector("#geduStaffClip")).toBeTruthy();
    expect(svg.querySelector("#geduTabClip")).toBeTruthy();

    const staffMarks = svg.querySelector("#geduStaffMarks") as SVGGElement | null;
    const tabMarks = svg.querySelector("#geduTabNumbers") as SVGGElement | null;
    expect(staffMarks?.getAttribute("clip-path")).toBe("url(#geduStaffClip)");
    expect(tabMarks?.getAttribute("clip-path")).toBe("url(#geduTabClip)");

    // sanity: staff clip rect ends at/before STAFF.yMax
    const r = svg.querySelector("#geduStaffClipRect") as SVGRectElement | null;
    expect(r).toBeTruthy();
    const y = Number(r?.getAttribute("y"));
    const h = Number(r?.getAttribute("height"));
    expect(Number.isFinite(y)).toBe(true);
    expect(Number.isFinite(h)).toBe(true);
    expect(y + h).toBeLessThanOrEqual(layout.staff.yMax + 1e-6);
  });
});

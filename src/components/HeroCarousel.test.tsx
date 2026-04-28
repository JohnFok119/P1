import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroCarousel } from "@/components/HeroCarousel";

describe("HeroCarousel", () => {
  it("uses optimized hero image assets", () => {
    render(<HeroCarousel />);

    const image = screen.getByRole("img", {
      name: /basketball action shot/i,
    });

    expect(image).toHaveAttribute("src", expect.stringContaining(".webp"));
  });

  it("preserves vertical touch scrolling while horizontal drag is enabled", () => {
    render(<HeroCarousel />);

    const image = screen.getByRole("img", {
      name: /basketball action shot/i,
    });
    const dragSurface = image.closest(".cursor-grab");

    expect(dragSurface).toHaveClass("touch-pan-y");
  });

  it("disables native image dragging so carousel drag owns the gesture", () => {
    render(<HeroCarousel />);

    const image = screen.getByRole("img", {
      name: /basketball action shot/i,
    });

    expect(image).toHaveAttribute("draggable", "false");
  });

  it("keeps landing sections off oversized PNG hero assets", () => {
    const files = [
      "AboutSection.tsx",
      "HeroCarousel.tsx",
      "InsightsSection.tsx",
      "ProjectsSection.tsx",
    ];

    files.forEach((file) => {
      const source = readFileSync(join(__dirname, file), "utf8");

      expect(source).not.toMatch(
        /@\/assets\/(?:basketball|volleyball|tennis|soccer)\.png/,
      );
    });
  });
});

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat,
} = require("docx");

const PAGE_WIDTH = 12240; // US Letter, DXA
const PAGE_HEIGHT = 15840;
const MARGIN = 1440; // 1 inch

function italicNote(text) {
  return new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text, italics: true, color: "595959" })],
  });
}

function heading1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 120 }, text });
}

function heading2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 }, text });
}

function checkboxItem() {
  return new Paragraph({
    numbering: { reference: "checklist", level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text: "" })],
  });
}

function blankLine(label) {
  return new Paragraph({
    spacing: { after: 240 },
    children: [
      new TextRun({ text: label + ": ", bold: true }),
      new TextRun({ text: "_______________________________________________" }),
    ],
  });
}

function riskTable() {
  const headerCells = ["Risk", "Risk Level", "Mitigating Action", "Contingent Action"];
  const colWidths = [3600, 1560, 2760, 2760]; // sums to 10680 (letter minus 1" margins = 12240-2880=9360... adjust)
  // Recompute to fit content width exactly: page width 12240 - margins 1440*2 = 9360
  const widths = [3200, 1400, 2380, 2380]; // sums to 9360

  function headerRow() {
    return new TableRow({
      tableHeader: true,
      children: headerCells.map((t, i) => new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: "2F3B52" },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: "FFFFFF" })] })],
      })),
    });
  }

  function emptyRow(riskLevelHint) {
    return new TableRow({
      children: widths.map((w, i) => new TableCell({
        width: { size: w, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({ text: i === 1 ? (riskLevelHint || "") : "", italics: i === 1, color: i === 1 ? "808080" : "000000" })],
        })],
      })),
    });
  }

  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" },
    },
    rows: [
      headerRow(),
      emptyRow("LOW / MED / HIGH"),
      emptyRow(),
      emptyRow(),
    ],
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "checklist",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "☐", // ☐
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      children: [
        new Paragraph({
          heading: HeadingLevel.TITLE,
          spacing: { after: 80 },
          children: [new TextRun({ text: "[Feature / Initiative Name]" })],
        }),
        italicNote("Replace the title above, then fill in each section below. Delete italic instructions as you go."),

        heading1("Objective"),
        italicNote("What are we building, and why — one or two lines."),

        heading1("Goal"),
        italicNote("What outcome does this create, and how does it tie back to the broader roadmap/vision?"),

        heading1("Features"),
        italicNote("What's being built, in plain language — not a task list, a description of the capability."),
        checkboxItem(), checkboxItem(), checkboxItem(),

        heading1("Dependencies"),
        italicNote("What has to be true, decided, or already built before this can start? Include open questions, not just confirmed facts."),

        heading1("Documentation"),
        italicNote("What needs to be written or updated — public setup docs, internal architecture notes, any standing “how this system works” doc your team maintains?"),

        heading1("Release Criteria"),

        heading2("Acceptance Criteria"),
        italicNote("The happy-path definition of done."),
        checkboxItem(), checkboxItem(),

        heading2("Non-Happy-Path / Risks"),
        italicNote("Every state a user could actually hit — error screens, timeouts, partial failures, wrong-account/wrong-mode cases — not just the happy path. Don't leave this table empty."),
        riskTable(),

        new Paragraph({ spacing: { before: 360, after: 120 }, border: { top: { style: BorderStyle.SINGLE, size: 6, color: "000000" } }, children: [] }),
        new Paragraph({
          spacing: { before: 120, after: 120 },
          children: [new TextRun({ text: "Sign-off", bold: true, size: 24 })],
        }),
        italicNote("Nothing downstream (tickets, build) starts until this is filled in."),
        blankLine("Approved by"),
        blankLine("Date"),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("PRD-Template.docx", buf);
  console.log("wrote PRD-Template.docx");
});

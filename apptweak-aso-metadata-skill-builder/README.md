# AppTweak ASO Metadata Skill Builder

A skill that interviews you and builds your own ASO metadata review skill, for the App Store and Google Play, on top of the AppTweak MCP.

You answer a short series of questions about your app, your rules and how you work. It assembles a finished, app-specific skill from a fixed template and hands it back for you to save. From then on you kick off your own skill with a short slash command of your choosing.

## What makes it different

- **Your philosophy goes in.** One setup question is open-ended: how you approach metadata, when you change a little versus a lot, and what you trust when the data conflicts. Your answer is stored in your own words and guides every recommendation. This is where your expertise shapes the process.
- **Store rules are already known.** App Store and Google Play character limits, how each store indexes text, and formatting rules are built in. You are never asked about them.
- **Defaults, all editable.** Every setup question that has a sensible default offers it. Change anything.
- **Bring your own data.** AppTweak is the default source. You can add App Store Connect, Google Play Console or other third-party data, and say how each should be used.
- **Cadence gate.** The generated skill checks how long it has been since each locale's last change before doing any work. This also makes scheduled, hands-off runs possible.
- **Rules that keep learning.** When you correct an output, the skill asks whether it should become a rule and at what scope. Rules are dated and reasoned, conflicts are flagged, and a periodic rules review lets you keep, reword, merge or retire them.

## Requirements

- Claude with skills support
- The AppTweak MCP connected, with your app followed in an AppTweak workspace

## Setup

Copy the `apptweak-aso-metadata-skill-builder/` folder into wherever your Claude setup loads skills from, or add `SKILL.md` as a skill in your client. Check your client's docs for the exact path, since it varies by product and version. Then ask Claude to build an ASO metadata skill for your app, and it will start the interview.

## What's in this folder

```
apptweak-aso-metadata-skill-builder/
├── SKILL.md    The builder skill: interview, template and learning rules
├── README.md   This file
└── LICENSE     MIT
```

## A note on the generated skill

The first version of your skill is a draft. Its rules are untested and expected to change after a few real runs. The Learned rules section exists for exactly that.

## License

MIT, see [`LICENSE`](./LICENSE).

// All text content for the landing page
// Edit this file to update any text — no need to touch components

export const landingContent = {

  pageTitle: "1inMINION: Heist to the Sun",

  hero: {
    eyebrow: "1inMINION PRESENTS",
    title: "HEIST TO THE\nSUN",
    oneliner: "we missed the MOON but the SUN has nowhere to hide.",
    ctaButton: "BEGIN THE HEIST",
  },

  story: {
    sectionLabel: "THE BACKSTORY",
    heading: "The Moon Heist Failed.",
    subheading: "But GRU is not done!",
    paragraphs: [
      "GRU had the shrink ray. He had the Minions. He had the plan. Then Vector happened. Mission failed. Moon still in the sky.",
      "So GRU did what every great villain does. He aimed bigger. This time we are not stealing the moon.",
      "This time we steal the SUN.",
    ],
    missionBox: {
      label: "YOUR MISSION",
      heading: "Build Your Own Minion.",
      description:
        "You will build and train your own AI Minion, powered by Claude, from a blank chat into something that " +
        "analyses data, follows your method, and acts in the real world on its own. " +
        "Together you will read 374 previous mission records and plan Operation: Steal the Sun.",
      highlight:
        "Every skill you build with your Minion today is a skill you take back to your real work tomorrow.",
    },
    ctaButton: "TRAIN THE MINION",
  },

  requirements: {
    label: "BEFORE YOU START",
    items: [
      "A Claude account — the paid plan (about $20/month) is needed for Projects, Skills, and Connectors",
    ],
  },

  connect: {
    label: "MEET THE HUMAN",
    intro: "// THE ONE BEHIND THE MINIONS",
    links: [
      { id: "linkedin",  label: "LINKEDIN",  tooltip: "LinkedIn",  url: "https://www.linkedin.com/in/vanshajgupta/" },
      { id: "portfolio", label: "PORTFOLIO", tooltip: "Portfolio", url: "https://vanshajgupta.com/" },
    ],
  },

} as const

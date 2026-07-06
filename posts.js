// ============================================================
// BLOG POSTS
// To publish a new article: copy the block below, paste it at
// the TOP of the array, and fill it in. That's it — the site
// renders this file automatically.
//
// {
//   slug: "unique-url-friendly-id",
//   title: "Post title",
//   date: "12 Jul 2026",
//   tags: ["payments", "learning"],
//   cover: "img/your-image.jpg",   // optional card/header image
//   excerpt: "One or two lines shown on the card.",
//   html: `
//     <p>Write your article here in HTML.</p>
//     <h3>Subheadings work</h3>
//     <p>So do <strong>bold</strong>, <em>italics</em>, lists and links.</p>
//   `
// },
// ============================================================

window.POSTS = [
  {
    slug: "why-i-built-careeros",
    title: "Why I built myself a career operating system",
    date: "6 Jul 2026",
    tags: ["careeros", "systems"],
    cover: "img/city-street.jpg",
    excerpt: "Job hunting is a data problem wearing a motivation problem's clothes. So I built a system instead of relying on willpower.",
    html: `
      <p>Two months into my first job after the MBA, I noticed something: every job application involved the same
      twenty decisions, made from scratch, every single time. Which resume version? What does this JD actually
      want? Is this posting even still open? Have I applied here before?</p>
      <p>That's not a motivation problem. That's a systems problem.</p>
      <h3>So I built CareerOS</h3>
      <p>A folder of plain markdown files that act as one brain: a master record of everything I've actually done,
      a scoring rubric for any role, a resume pipeline, and a log of every application — including the dead ends.
      The rule that holds it together is simple: <strong>never fabricate</strong>. Reorder, rephrase, emphasise —
      but never invent.</p>
      <p>The surprising part? The system's biggest value isn't speed. It's honesty. When every claim traces back
      to a dated record, you stop drifting toward the embellished version of yourself — and interviews get a lot
      less stressful.</p>
      <p>This site is the front-end of that system. More notes to come.</p>
    `
  }
];

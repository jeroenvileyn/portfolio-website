/* =====================================================================
   site.ts — YOUR CONTENT. This is the main file you edit.
   ---------------------------------------------------------------------
   - Every { en: "...", nl: "..." } is one text in English and Dutch.
   - Optional fields (marked with ? in types.ts) can be deleted to hide them.
   - Copy an item in a list to add more; delete it to remove it.
   - Blog posts are NOT here: they're Markdown files in /posts.
   ===================================================================== */

import type { SiteContent } from "../types";

export const site: SiteContent = {
  name: "Jeroen Vileyn",
  handle: "jvileyn",
  role: {
    en: "Cybersecurity Student",
    nl: "Student Cybersecurity",
  },
  tagline: {
    en: "Focused on offensive security, blue teaming and scripting.",
    nl: "Gefocust op offensive security, blue teaming en scripten.",
  },
  location: { en: "Bruges, Belgium", nl: "Brugge, België" },
  status: {
    en: "Last year Cybersecurity",
    nl: "Laatste jaar Cybersecurity",
  },
  photo: "",
  cv: { en: "", nl: "" },

  /* ---------- About ---------- */
  about: [
    {
      en: "Hi! I'm Jeroen Vileyn. I am currently in my last year Cybersecurity at Howest. I always love to continue developing different skills and mastering those I already know. When not focussed on my studies, I like running, visiting new cities, movies and some gaming.",
      nl: "Hallo! Ik ben Jeroen Vileyn. Ik zit momenteel in mijn laatste jaar Cybersecurity aan Howest. Ik vind het altijd leuk om nieuwe vaardigheden te ontwikkelen en de vaardigheden die ik al heb verder te perfectioneren. Als ik even niet met mijn studie bezig ben, houd ik van hardlopen, nieuwe steden ontdekken, films kijken en af en toe gamen.",
    },
  ],
  focus: [
    { en: "Penetration Testing", nl: "Penetration Testing" },
    { en: "Network Security", nl: "Netwerkbeveiliging" },
    { en: "Incident Response", nl: "Incident Response" },
    { en: "Scripting", nl: "Scripten" },
  ],
  skills: [
    { group: { en: "Offensive", nl: "Offensief" }, items: ["Burp Suite", "Metasploit", "Nmap", "OWASP Top 10"] },
    { group: { en: "Defensive", nl: "Defensief" }, items: ["Wireshark", "Wazuh", "Sysinternal", "OPNSense"] },
    { group: { en: "Systems", nl: "Systemen" }, items: ["Linux", "Windows / AD", "Docker", "Azure"] },
    { group: { en: "Languages", nl: "Talen" }, items: ["Python", "Bash", "PowerShell", "Javascript"] },
  ],
  certifications: [
    { name: "None (yet)", issuer: "", year: "", status: "planned" },
  ],

  /* ---------- Projects ---------- */
  projects: [
    {
      title: { en: "Python Security Toolkit", nl: "Python Security Toolkit" },
      category: { en: "Tool", nl: "Tool" },
      description: {
        en: "A python tool containing multiple smaller modules.",
        nl: "Een Python-tool die uit meerdere kleinere modules bestaat",
      },
      details: [
        {
          en: "Consists a port scanner, packet sniffer, mac spoofer, ssh connector, password generator, key logger, web scraper, web recon tool, base decoder, folder organizer and an ip geolocation retriever.",
          nl: "Bevat een poortscanner, een pakketsniffer, een MAC-spoofer, een SSH-connector, een wachtwoordgenerator, een keylogger, een webscraper, een tool voor webverkenning, een basisdecoder, een mapbeheerder en een tool voor het opzoeken van de geografische locatie op basis van een IP-adres.",
        },
      ],
      tags: ["Python", "Networking", "Pentesting"],
      links: { code: "https://github.com/jeroenvileyn/python-toolkit" },
    },
    {
      title: { en: "Howest CTF 2025", nl: "Howest CTF 2025" },
      category: { en: "CTF", nl: "CTF" },
      description: {
        en: "We played capture-the-flag competitions with a university team, challenges of all flavors. Finished overall 1st of 2 project/CTF weeks receiving the winners trophy",
        nl: "We hebben ‘capture-the-flag’-wedstrijden gespeeld tegen een universiteitsteam, met allerlei soorten uitdagingen. We zijn als eerste geëindigd in de algemene ranglijst van de twee project-/CTF-weken en hebben de winnaarstrofee in ontvangst genomen.",
      },
      tags: ["Web", "Forensics", "Crypto", "Ghidra", "Wireshark", "Python", "Android Studio", "Audacity", "gdb", "Metasploit"],
      links: { writeup: "" },
    },
    {
      title: { en: "Honeypot", nl: "Honeypot" },
      category: { en: "Project", nl: "Project" },
      description: {
        en: "Built a secure webserver with a honeypot to be pentested by students + pentesting other honeypots.",
        nl: "Ik heb een beveiligde webserver met een honeypot opgezet, die door studenten getest kon worden, en heb ook andere honeypots getest.",
      },
      details: [
        {
          en: "I Found a stored XSS in one website stealing the administrator's cookie when they opened the admin page. Wrote a report with proof of concept and fix advice.",
          nl: " Ik ontdekte een opgeslagen XSS-kwetsbaarheid op een website, waardoor de cookie van de beheerder werd gestolen zodra deze de beheerderspagina opende. Ik heb een rapport opgesteld met een proof of concept en aanbevelingen voor een oplossing."
        },
        {
          en: "Project together with Maddox Heyndrickx and Gianna Vandoorne.",
          nl: "Project in samenwerking met Maddox Heyndrickx en Gianna Vandoorne"
        },
      ],
      tags: ["Burp Suite", "OWASP ZAP", "Python", "Nginx"],
      links: { code: "https://github.com/jeroenvileyn/honeypot" },
    },
    {
      title: { en: "Simulated Company Environment: Active Directory Attack & Defense", nl: "Homelab: Active Directory aanval & verdediging" },
      category: { en: "Lab", nl: "Lab" },
      description: {
        en: "Created and secured a company environment \'Katies Kitchens\' based on a past security audit.",
        nl: "Op basis van een eerdere beveiligingsaudit heb ik een bedrijfsomgeving met de naam \'Katies Kitchens\' opgezet en beveiligd.",
      },
      tags: ["Active Directory", "Linux", "nftables", "restic", "Certificates", "Networking"],
      links: { writeup: "blog.html" },
    },

  ],

  /* ---------- Experience & education ---------- */
  timeline: [
    {
      when: { en: "2025 — now", nl: "2025 — nu" },
      title: { en: "Bachelor in Cybersecurity", nl: "Bachelor Cybersecurity" },
      place: "Your University / College",
      text: { en: "Relevant courses, thesis topic, student society…", nl: "Relevante vakken, bachelorproef, studentenvereniging…" },
    },
  ],

  contact: {
    intro: {
      en: "Want to talk or contact me? My inbox is open.",
      nl: "Zin om te praten of mij te contacteren? Stuur me gerust een bericht.",
    },
    email: "vileynjeroen717@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jeroen-vileyn/" },
      { label: "GitHub", url: "https://github.com/jeroenvileyn" },
      { label: "TryHackMe", url: "https://tryhackme.com/p/realbab" },
    ],
  },
};

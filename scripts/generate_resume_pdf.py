from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "output" / "pdf"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT_FILE = OUT_DIR / "Wai_Phyo_Oo_Resume.pdf"


INK = colors.HexColor("#17202A")
MUTED = colors.HexColor("#4D5B66")
ACCENT = colors.HexColor("#0B7285")
LINE = colors.HexColor("#D8DEE4")
LIGHT = colors.HexColor("#F4F7F9")


def make_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=26,
            alignment=TA_CENTER,
            textColor=INK,
            spaceAfter=3,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            alignment=TA_CENTER,
            textColor=ACCENT,
            spaceAfter=5,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10.5,
            alignment=TA_CENTER,
            textColor=MUTED,
            spaceAfter=8,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=ACCENT,
            spaceBefore=8,
            spaceAfter=4,
            borderWidth=0,
            borderPadding=0,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.4,
            leading=11.2,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.7,
            leading=9.6,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=INK,
            spaceAfter=1,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=7.7,
            leading=9.5,
            textColor=MUTED,
            spaceAfter=3,
        ),
        "tech": ParagraphStyle(
            "Tech",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=7.5,
            leading=9.3,
            textColor=MUTED,
            spaceBefore=1,
            spaceAfter=4,
        ),
    }


def section(title, styles):
    return [
        Paragraph(title.upper(), styles["section"]),
        Table([[""]], colWidths=[180 * mm], style=TableStyle([
            ("LINEBELOW", (0, 0), (-1, -1), 0.6, LINE),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        ])),
    ]


def bullets(items, styles):
    return ListFlowable(
        [
            ListItem(Paragraph(item, styles["small"]), leftIndent=8, bulletColor=ACCENT)
            for item in items
        ],
        bulletType="bullet",
        start="circle",
        leftIndent=12,
        bulletFontSize=5,
        bulletOffsetY=1,
        spaceBefore=1,
        spaceAfter=3,
    )


def skill_table(styles):
    rows = [
        [
            Paragraph("<b>Backend</b><br/>C#, .NET 8, ASP.NET Core, ASP.NET MVC, EF Core, LINQ, REST APIs, Go", styles["small"]),
            Paragraph("<b>Frontend</b><br/>React, TypeScript, JavaScript, Vite, Tailwind CSS, Ant Design, Razor, jQuery", styles["small"]),
        ],
        [
            Paragraph("<b>Data & Auth</b><br/>SQL Server, PostgreSQL, SQLite, JWT, RBAC, OTP login, password hashing", styles["small"]),
            Paragraph("<b>Delivery</b><br/>Docker basics, GitHub Actions, Git, IIS, backup/restore, health checks", styles["small"]),
        ],
        [
            Paragraph("<b>Reporting</b><br/>Excel export, PDF generation, filtered reports, payment/business reports", styles["small"]),
            Paragraph("<b>Libraries</b><br/>MediatR, Serilog, FluentValidation, xUnit, Moq, ClosedXML, QuestPDF, ExcelJS", styles["small"]),
        ],
    ]
    table = Table(rows, colWidths=[88 * mm, 88 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), LIGHT),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.white),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return table


def project(title, subtitle, items, tech, styles):
    return KeepTogether([
        Paragraph(title, styles["role"]),
        Paragraph(subtitle, styles["meta"]),
        bullets(items, styles),
        Paragraph(f"<b>Technologies:</b> {tech}", styles["tech"]),
    ])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.4)
    canvas.line(15 * mm, 12 * mm, 195 * mm, 12 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(15 * mm, 7.5 * mm, "Wai Phyo Oo - Backend-Focused Full-Stack Developer")
    canvas.drawRightString(195 * mm, 7.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build():
    styles = make_styles()
    doc = BaseDocTemplate(
        str(OUT_FILE),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=12 * mm,
        bottomMargin=16 * mm,
        title="Wai Phyo Oo Resume",
        author="Wai Phyo Oo",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=footer)])

    story = [
        Paragraph("Wai Phyo Oo", styles["name"]),
        Paragraph("Backend-Focused Full-Stack Developer", styles["headline"]),
        Paragraph(
            "Yangon, Myanmar | eulen9t5@gmail.com | Telegram: @nighteule39 | GitHub: github.com/Eulean | Remote / work from home",
            styles["contact"],
        ),
    ]

    story += section("Professional Summary", styles)
    story.append(Paragraph(
        "Backend-focused full-stack developer with hands-on experience building business workflow systems using .NET, React, SQL databases, and Go. Experienced in enterprise trade, e-commerce registration, reporting, authentication, and document workflow systems, plus complete public projects such as a restaurant POS platform. Strongest in API development, database-backed workflows, authentication/authorization, Excel/PDF exports, legacy maintenance, and practical full-stack delivery.",
        styles["body"],
    ))

    story += section("Core Skills", styles)
    story.append(skill_table(styles))

    story += section("Experience", styles)
    story += [
        Paragraph("Full-Stack Developer / Enterprise Systems Contributor", styles["role"]),
        Paragraph("Shwe-Digits organization projects | Enterprise trade, e-commerce, customs/reporting, and Tradenet-related systems", styles["meta"]),
        bullets([
            "Built and maintained backend and frontend features across ASP.NET Core APIs, ASP.NET MVC/Razor, React/TypeScript admin portals, and reporting interfaces.",
            "Implemented OTP login, email OTP verification, user activation checks, and role-based access control for business registration systems.",
            "Built filtered reporting APIs, frontend report pages, Excel export flows, approval/rejection workflows, appeal handling, extension search, payment reports, and file attachment flows.",
            "Contributed to Tradenet 2.0 oversea member-management workflows, including sub-member edit, email/password edit, activation/deactivation, validation, and active-member limits.",
            "Fixed production-style workflow issues around query conditions, exact-date search, UI state, responsive layouts, signup duplication, and table/list behavior.",
        ], styles),
        Paragraph("<b>Technologies:</b> C#, ASP.NET Core, ASP.NET MVC, EF Core, SQL Server, React, TypeScript, Ant Design, Razor, jQuery, DataTables, ExcelJS, JWT, OTP, Git", styles["tech"]),
        Spacer(1, 2),
        Paragraph("Backend / Full-Stack Project Contributor", styles["role"]),
        Paragraph("one-project-one-month organization projects | LMS, online job finder, and tested .NET backend systems", styles["meta"]),
        bullets([
            "Implemented JWT authentication, token generation, token refresh, role claims, registration/login endpoints, Swagger bearer authentication, BCrypt password hashing, and request validation.",
            "Built recruiter/company profile services, job management models, job application workflows, status updates, and company review features.",
            "Worked with authenticated user claims to enforce ownership and role-specific behavior in .NET backend systems.",
        ], styles),
        Paragraph("<b>Technologies:</b> C#, .NET, ASP.NET Core, EF Core, JWT, BCrypt, FluentValidation, SQL Server, Swagger", styles["tech"]),
    ]

    story += section("Selected Projects", styles)
    story.append(project(
        "Restaurant POS System",
        "github.com/Eulean/POSFORRESTURANT",
        [
            "Full-stack POS with authentication, RBAC, orders, kitchen workflow, payments, inventory, receipts, reports, backup/restore, health checks, and deployment notes.",
            "Verified locally with a successful .NET solution build.",
        ],
        ".NET 8, ASP.NET Core, SQLite, EF Core, React, Vite, QuestPDF, ClosedXML",
        styles,
    ))
    story.append(project(
        "Tradenet 2.0 Oversea Member Management",
        "Private organization project; internal details summarized for confidentiality",
        [
            "Added sub-member account edit workflow with edit email/password screens, MVC controller actions, repository HTTP calls, and AJAX form handling.",
            "Added DataTables action dropdowns and enforced maximum active sub-member rules in UI and server-side logic.",
        ],
        "ASP.NET MVC, C#, Razor, jQuery, DataTables, SweetAlert, REST integration",
        styles,
    ))
    story.append(project(
        "Enterprise E-Commerce / DOCA / DOCCA Workflows",
        "Private organization projects; summarized for confidentiality",
        [
            "Implemented OTP login, admin email OTP, role-based authorization, filtered report APIs, appeal workflows, extension search, and payment report pages.",
            "Improved business-name/application-number search and fixed approval/rejection list behavior.",
        ],
        "ASP.NET Core, EF Core, React, TypeScript, Ant Design, SQL Server, JWT, OTP, Excel export",
        styles,
    ))
    story.append(project(
        "Safety Data Sheet / PDF Generation",
        "github.com/Eulean/SafetyDataSheet",
        [
            "Built ASP.NET Core MVC/Razor functionality for structured safety data sheet information, EF Core migrations, and PDF generation workflows.",
        ],
        "ASP.NET Core MVC, Razor, EF Core, SQL Server, PuppeteerSharp",
        styles,
    ))
    story.append(project(
        "Go Backend Practice",
        "github.com/Eulean/goRelated",
        [
            "Built Go/Gin backend practice with authentication-oriented structure, handlers, services, repositories, PostgreSQL, JWT, rate limiting, and Docker support.",
        ],
        "Go, Gin, PostgreSQL, JWT, Docker",
        styles,
    ))

    story += section("Education", styles)
    story.append(bullets([
        "Bachelor of Science in Botany.",
        "Computer Science coursework, University of the People - currently attending.",
        "Java Development Course Bootcamp (JDC), Myanmar.",
    ], styles))

    story += section("Availability", styles)
    story.append(Paragraph(
        "Available for remote full-time, part-time, freelance, or contract software development roles.",
        styles["body"],
    ))

    doc.build(story)
    print(OUT_FILE)


if __name__ == "__main__":
    build()

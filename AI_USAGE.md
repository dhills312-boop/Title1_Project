# AI Usuage Policy (Internal)

This document defines how I use AI tools in my development workflow, what is explicitly allowed, waht is restricted, and what is never done without client consent.

The purpose of this document is to ensure:
- ethical consistency
- environmental responsibility
- client trust
- workflow clarity
- reproducibility without AI if required

This document applies to all development and design work unless a project-specific exception is documented in writing.

---
## 1. Core Principles

- AI is a **development aid**, not a substitute for engineering judgment. 
- AI is used only when it improves clarity, speed, or understanding.
- No client-facing system depends on AI unless explicity agreed.
- AI usuage must not create hidden costs, risks, or dependencies for clients.
- Human review is always required for AI-assisted outputs.
- Systems are designed to funciton without continous AI inference.

---
## 2. Allowed AI Usuage  (Default)

The following uses of AI are permitted as part of my personal workflow:

### 2.1 Development Assistance
- Code scaffolding and boilerplate generation
- Refactoring suggestions
- Debugging explanations
- Test case suggestions
- API usuage clarification
- Documentation drafting

These uses:
- do not introduce runtime AI dependencies
- do not affect deployed behavior
- do not incur client-side costs

Examples:
- Asking an LLM to explain an error message 
- Generating a test stub and then reviewing/editing it
- Clarifying unfamiliar library syntax

---
### 2.2 Research & Planning
- Architecture brainstorming
- Tradeoff analysis
- Technology comparison
- Writing internal design notes

All final decisions are made manually and reviewed. 

---
## 3. Restricted AI Usage (Explicit Disclosure Required)

The following uses are allowed **only** if explicitly agreed with the client and documented in the project scope:

- AI-powered features inside the product
- Use of external AI APIs at runtime
- Any feature that generates user-facing content
- Any feature that may incur usage-based costs
- Any feature that affects user data or privacy

Additional requirements:
- Clear explantation of model behavior and limitations
- Human review or approval mechanisms where applicable
- Ability to disable or remove AI features
- No always-on or autonomous AI behavior by default

---
## 4. Disallowed AI Usage (Hard Rule)

The following are not used under any circumstances unless a client explicitly request them and accepts the risks:

- Autonomous agents operating without human oversight
- Background or always-on AI processes
- Unbounded retries or self-modifying AI behavior
- Bulk content generation for spam, SEO, or engagement farming
- AI features added solely for marketing appeal
- Training or fine-tuning models on client data

---
## 5. Environmental & Efficiency Commitments

When AI is used:
- Smaller or more efficient models are preferred
- Token usage is minimized
- Outputs are constrained in length and scope
- Redundant calls are avoided
- Deterministic tools are used before AI where possible

Where feasible:
- Results are cached
- AI usage is logged internally
- AI features are optional and removeable

---
#6. Non-AI Fallback Capability

All systems I build ae designed so that:

- Core functionality works without AI
- AI-assisted steps can be performed manually
- Development can proceed without AI tools if required

I maintain the ability to:
- write and refactor code manually
- debug using standard tooling
- consult official documentation
- implement features without AI assistance

AI is treated as an accelerator, not a dependency.

---
## 7. Project-Specific Expectations

If a project requires deviation from this policy:
- The expectation is documented
- The scope is clearly defined
- The client explicitly agrees

No undocumented exceptions are allowed.

---
## 8. Review & Updates

This document is reviewed periodically and updated as tools, best practicies, and environmental standards evolve.
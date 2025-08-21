# Claude Memory for Jackroll Project

## Git Workflow Instructions
- **ALWAYS** run `git pull` before creating any new branch
- **ALWAYS** push completed features to remote
- **ALWAYS** merge completed feature branches into master before creating new feature branches
- Pull and push every time we create new branches and features
- Follow the feature branch strategy documented in README.md
- Branch naming: `feature/name`, `fix/name`, `refactor/name`, `docs/name`
- **Commit messages should only mention user, NOT Claude or AI assistance**
- **Feature Branch Workflow**: Complete feature → Merge to master → Create new feature branch

## Token Efficiency Instructions
- **ALWAYS** read .md files with limits to avoid wasting tokens
- Use `limit` parameter when reading large files
- Only read full files when absolutely necessary

## Communication Instructions
- **ALWAYS** explain what you are creating/doing before taking action
- Tell user what files you're creating and why
- Let user learn from the process and correct any mistakes
- Remember that AI can hallucinate - user needs to verify approach

## Critical Reference Instructions
- **ALWAYS** read README.md before making architectural or business logic decisions
- **NEVER** assume requirements - verify against README.md specifications
- **DOUBLE-CHECK** user types, fee structures, and system requirements in README.md
- Inaccurate information costs time and money - verify everything against documentation

## Terminal and Development Server Instructions
- **ALWAYS** use port 3000 for development server
- **ALWAYS** kill port 3000 processes before starting dev server automatically
- **NEVER** ask user to kill processes - do it in ONE command
- Port 3000 sometimes gets cached, so always clear it first
- **CORRECT** Command to use: `lsof -ti:3000 | xargs kill -9 2>/dev/null; npm run dev`

## Project Context
- NFT gaming dApp called Jackroll
- Uses Next.js, TypeScript, shadcn/ui, Tailwind CSS
- Apple-inspired design with Helvetica Now font
- Orange (#f7931a) and black/white color scheme
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

## Development Server Instructions
- **ALWAYS** use port 3000 for development server
- Kill any processes using port 3000 before starting dev server
- User prefers consistent port 3000 for all development

## Project Context
- NFT gaming dApp called Jackroll
- Uses Next.js, TypeScript, shadcn/ui, Tailwind CSS
- Apple-inspired design with Helvetica Now font
- Orange (#f7931a) and black/white color scheme
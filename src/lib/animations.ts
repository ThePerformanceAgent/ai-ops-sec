/* Identificadores das animações de capa (herdadas do Tokenization Economy, agora na paleta da
   Torre). Cada artigo pode declarar `cover: <id>` no frontmatter. */
export const ANIMATION_IDS = [
	'token-flow',
	'agent-orbit',
	'neural-mesh',
	'prompt-craft',
	'data-stream',
	'chain-blocks',
	'culture-waves',
	'engineering-grid',
	'cost-meter',
	'governance-shield',
	'tokenizer-split',
	'agentic-alpha',
	'hidden-balance',
	'attack-chain',
	'default-gradient',
] as const;
export type AnimationId = (typeof ANIMATION_IDS)[number];
export const ANIMATION_LABELS: Record<AnimationId, string> = {
	'token-flow': 'Token flow',
	'agent-orbit': 'Agent swarm',
	'neural-mesh': 'Neural net',
	'prompt-craft': 'Prompt craft',
	'data-stream': 'Data stream',
	'chain-blocks': 'Chain blocks',
	'culture-waves': 'Community',
	'engineering-grid': 'Blueprint',
	'cost-meter': 'Cost meter',
	'governance-shield': 'Governance',
	'tokenizer-split': 'Tokenizer split (PT vs EN)',
	'agentic-alpha': 'Agentic alpha (1 visible · 10 hidden)',
	'hidden-balance': 'Hidden balance (cache ledger)',
	'attack-chain': 'Attack chain: untrusted input, model, tool, outbound (input to consequence)',
	'default-gradient': 'Gradient',
};

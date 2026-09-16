/* As áreas do laboratório. Cada artigo pertence a uma. A primeira é a área em destaque
   (AI Ops Sec); as outras cobrem o resto do que é pôr agentes de IA a trabalhar. Mudar
   nomes ou ordem é só aqui. */
import type { Locale } from '../consts';

export type AreaKey = 'ai-ops-sec' | 'agentes' | 'automacao' | 'avaliacao' | 'governanca' | 'modelos';

export interface Area {
	key: AreaKey;
	seq: string;
	highlight?: boolean;
	name: Record<Locale, string>;
	short: Record<Locale, string>;
	description: Record<Locale, string>;
	topics: Record<Locale, string[]>;
}

export const AREAS: Area[] = [
	{
		key: 'ai-ops-sec',
		seq: '01',
		highlight: true,
		name: { pt: 'AI Ops Sec', en: 'AI Ops Sec' },
		short: { pt: 'Segurança e observabilidade de agentes', en: 'Agent security and observability' },
		description: {
			pt: 'Atacar e observar agentes em produção antes de outros o fazerem: red teaming, OWASP Agentic e MCP Top 10, OpenTelemetry GenAI, guardrails, identidade de agentes.',
			en: 'Attacking and observing agents in production before someone else does: red teaming, OWASP Agentic and MCP Top 10, OpenTelemetry GenAI, guardrails, agent identity.',
		},
		topics: { pt: ['red teaming', 'MCP', 'OWASP ASI', 'OTel GenAI', 'guardrails'], en: ['red teaming', 'MCP', 'OWASP ASI', 'OTel GenAI', 'guardrails'] },
	},
	{
		key: 'agentes',
		seq: '02',
		name: { pt: 'Agentes e orquestração', en: 'Agents and orchestration' },
		short: { pt: 'Como se constrói um agente que aguenta produção', en: 'How to build an agent that survives production' },
		description: {
			pt: 'Arquitectura de agentes e de sistemas multi-agente: ferramentas, memória, servidores MCP, orquestração com n8n, autonomia com travões.',
			en: 'Agent and multi-agent architecture: tools, memory, MCP servers, orchestration with n8n, autonomy with brakes.',
		},
		topics: { pt: ['MCP servers', 'n8n', 'multi-agente', 'memória', 'harness'], en: ['MCP servers', 'n8n', 'multi-agent', 'memory', 'harness'] },
	},
	{
		key: 'automacao',
		seq: '03',
		name: { pt: 'Automação e ROI', en: 'Automation and ROI' },
		short: { pt: 'Processos de negócio entregues a agentes, com contas feitas', en: 'Business processes handed to agents, with the numbers' },
		description: {
			pt: 'Automação de processos com agentes em empresas reais: onde começa, o que se mede, quanto custa e o que se poupa. Menos teatro, mais produção.',
			en: 'Process automation with agents in real companies: where to start, what to measure, what it costs and what it saves. Less theatre, more production.',
		},
		topics: { pt: ['processos', 'custos', 'métricas', 'CRM e ads', 'runbooks'], en: ['processes', 'costs', 'metrics', 'CRM and ads', 'runbooks'] },
	},
	{
		key: 'avaliacao',
		seq: '04',
		name: { pt: 'Avaliação e qualidade', en: 'Evaluation and quality' },
		short: { pt: 'Saber se o agente acertou, antes de o cliente saber', en: 'Knowing whether the agent got it right before the client does' },
		description: {
			pt: 'Evals, LLM como juiz, conjuntos de teste, regressão em CI, medição de alucinação e de desvio ao longo do tempo.',
			en: 'Evals, LLM as judge, test sets, regression in CI, measuring hallucination and drift over time.',
		},
		topics: { pt: ['evals', 'LLM-as-judge', 'regressão', 'drift', 'promptfoo'], en: ['evals', 'LLM-as-judge', 'regression', 'drift', 'promptfoo'] },
	},
	{
		key: 'governanca',
		seq: '05',
		name: { pt: 'Governança e regulação', en: 'Governance and regulation' },
		short: { pt: 'O que a lei já pede aos agentes, lido por quem os opera', en: 'What the law already asks of agents, read by an operator' },
		description: {
			pt: 'AI Act, NIS2, ISO/IEC 42001 e políticas internas traduzidos em requisitos técnicos: registo, supervisão humana, divulgação responsável.',
			en: 'AI Act, NIS2, ISO/IEC 42001 and internal policies translated into technical requirements: logging, human oversight, responsible disclosure.',
		},
		topics: { pt: ['AI Act', 'NIS2', 'ISO 42001', 'políticas', 'divulgação'], en: ['AI Act', 'NIS2', 'ISO 42001', 'policies', 'disclosure'] },
	},
	{
		key: 'modelos',
		seq: '06',
		name: { pt: 'Modelos e infraestrutura', en: 'Models and infrastructure' },
		short: { pt: 'Modelos locais e comerciais, e a infra que os serve', en: 'Local and commercial models, and the infrastructure that serves them' },
		description: {
			pt: 'Modelos abertos em hardware próprio, afinação, custos de inferência, escolha entre fornecedores, soberania dos dados.',
			en: 'Open models on your own hardware, fine-tuning, inference costs, choosing between providers, data sovereignty.',
		},
		topics: { pt: ['modelos locais', 'MLX', 'fine-tuning', 'custos', 'soberania'], en: ['local models', 'MLX', 'fine-tuning', 'costs', 'sovereignty'] },
	},
];

export const AREA_KEYS = AREAS.map((a) => a.key) as [AreaKey, ...AreaKey[]];

export function areaOf(key: string): Area {
	return AREAS.find((a) => a.key === key) ?? AREAS[0];
}

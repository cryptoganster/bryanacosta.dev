export interface Skill {
  name: string
  icon: string
  category: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

import { techStack } from '@/entities/tech-stack'

export function getTechStackIcons(techStackKeys: string[]) {
  return techStackKeys
    .map((key) => techStack.find((tech) => tech.altKey === key))
    .filter((tech): tech is NonNullable<typeof tech> => tech !== undefined)
}

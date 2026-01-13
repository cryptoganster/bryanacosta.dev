export function useNavigation() {
  const items = [
    { label: 'Soluciones', href: '#' },
    { label: 'Proyectos', href: '#' },
    { label: 'Stack', href: '#' },
    { label: 'Trayectoria', href: '#' },
  ]

  return {
    items,
    isScrolled: false,
    mobileMenuOpen: false,
  }
}

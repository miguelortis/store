export const getNameInitials = (fullName: string): string => {
  if (!fullName || typeof fullName !== 'string') {
    return ''
  }

  const words = fullName.split(' ')
  let initials = ''

  for (const word of words) {
    if (word && word.length > 0) {
      initials += word.charAt(0).toUpperCase()
    }
  }

  return initials
}

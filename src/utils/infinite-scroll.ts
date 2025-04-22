export const infiniteScroll = (event: Event, fetch: () => Promise<void>) => {
  const target = event.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetch()
  }
}

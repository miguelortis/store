export interface Route {
  path: string
  name: string
  component: () => Promise<any>
  hidden?: boolean
}

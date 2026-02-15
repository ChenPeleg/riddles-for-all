export function formatBuildVersion(buildDate: string): string {
  return new Date(buildDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '.');
}

export async function register() {
  if (typeof localStorage === "undefined") {
    (global as any).localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
  if (typeof sessionStorage === "undefined") {
    (global as any).sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
  }
}

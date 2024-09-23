export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  console.log(config);

  return {
    provide: {
      api: (path: string) => config.public.apiBase + path,
    },
  };
});

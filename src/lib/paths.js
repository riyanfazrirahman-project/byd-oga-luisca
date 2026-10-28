import { SITE } from "@/data/site.config";

export function asset(group, file) {
  if (!Object.prototype.hasOwnProperty.call(SITE.paths, group)) {
    throw new Error(`Grup aset tidak dikenal: ${group}`);
  }
  const base = SITE.paths[group].replace(/\/$/, "");
  return `${base}/${file}`;
}

export function modelAsset(model, file) {
  return `${SITE.paths.models}/${model.images.folder}/${file}`;
}

export function routePath(key, params = {}) {
  const pattern = SITE.routes[key];
  if (!pattern) throw new Error(`Rute tidak dikenal: ${key}`);
  return pattern.replace(/:(\w+)/g, (_, name) => {
    if (params[name] === undefined) {
      throw new Error(`Parameter rute "${name}" tidak diberikan`);
    }
    return encodeURIComponent(params[name]);
  });
}

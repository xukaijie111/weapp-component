

export function safeMerge(obj1,obj2){
  if (!obj2) return obj1;

  for (var key in obj2){
    if (obj2[key]) obj1[key] = obj2[key]
  }

  return obj1;
}
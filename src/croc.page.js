export const layout = "layouts/croc.vto";

export default function* ({crocs}) {

  // make an iterable array from the corcs object
  const crocsArray = Object.values(crocs);
  for (const page of crocsArray) {
    yield {
      url: `/croc/${page.name }/`,
      ...page,
    };
  }
}
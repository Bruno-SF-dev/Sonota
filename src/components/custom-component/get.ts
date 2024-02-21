export const getNewData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [{ title: "Casimiro" }, { title: "Vinicin" }];
};

export const generateMetaData = async (slug) => {
  try {
    const rs = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAMEA}/wp-json/yoast/v1/get_head?url=${process.env.NEXT_PUBLIC_HOSTNAMEA}${slug}`,
      {
        method: "GET",
      }
    );
    return rs.json();
  } catch (err) {
    console.error("myerr", err);
    return res.status(400).json({ message: err.message });
  }
};
export default generateMetaData;

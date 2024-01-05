import egnyteAuth from "./auth.js";

export default async function uploadFile(filename) {
  const token = await egnyteAuth();

}
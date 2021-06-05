import { supabase } from "./supabase"

// Fetch articles.
// export const fetchArticles = async (limit: number, page: number,) => {
export const fetchArticles = async (start: number, end: number,) => {
  try {
    // const start = limit * page;
    // const end = ((limit * page) + limit) - 1;
    console.log(`start, end`, start, end)
    let result = await supabase.from('articles')
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range(start, end);

    return result;
  } catch (error) {
    console.log('error', error)
  }
}

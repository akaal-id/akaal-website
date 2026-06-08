import Footer from "@/app/home/footer/footer";
import { getAllNewsroomContent } from "@/lib/api/newsroom";
import { toNewsroomListItem } from "@/content/newsroom";
import NewsroomGrid from "./newsroom-grid";

export default async function NewsroomPage() {
  const content = await getAllNewsroomContent();
  const items = content.map(toNewsroomListItem);

  return (
    <>
      <main>
        <NewsroomGrid items={items} />
      </main>
      <Footer />
    </>
  );
}

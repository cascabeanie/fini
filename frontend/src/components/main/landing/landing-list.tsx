import LandingItem from "./landing-item";

export default function LandingList() {
  return (
    <>
      <div className="m-4 flex rounded-3xl border-gray-100 bg-white shadow-xl sm:max-w-4xl">
        <ul className="m-4 grid w-full grid-rows-[repeat(auto)] gap-8">
          <LandingItem
            ItemCompleted={false}
            Itemtitle={"Train"}
            ItemPriority={"green"}
            ItemCategory={"travel"}
            ItemCategoryColour={"bg-purple-100 text-purple-800"}
            ItemDeadline={"Friday 24 January 2025 at 09:00"}
            ItemNotes={"Buy ticket to London"}
          />

          <LandingItem
            ItemCompleted={false}
            Itemtitle={"Meeting"}
            ItemPriority={"orange"}
            ItemCategory={"work"}
            ItemCategoryColour={"bg-blue-100 text-blue-800"}
            ItemDeadline={"Monday 27 January 2025 at 11:30"}
            ItemNotes={"On Teams"}
          />

          <LandingItem
            ItemCompleted={true}
            Itemtitle={"Groceries"}
            ItemPriority={"orange"}
            ItemCategory={"food"}
            ItemCategoryColour={"bg-yellow-100 text-yellow-800"}
            ItemDeadline={"Friday 24 January 2025 at 08:30"}
            ItemNotes={"No milk in the fridge"}
          />

          <LandingItem
            ItemCompleted={true}
            Itemtitle={"IOU"}
            ItemPriority={"red"}
            ItemCategory={"finance"}
            ItemCategoryColour={"bg-green-100 text-green-800"}
            ItemDeadline={"Thursday 24 January 2025 at 21:00"}
            ItemNotes={"Pay back Veronica!"}
          />
        </ul>
      </div>
    </>
  );
}

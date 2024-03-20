import React from "react";

function MenuDetailsPage({ params }: { params: { menu_id: string } }) {
  return <div>MenuDetailsPage {params.menu_id} </div>;
}

export default MenuDetailsPage;

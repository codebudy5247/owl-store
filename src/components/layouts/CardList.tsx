import React, { useState, useEffect } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import TableComp from "../Table";
import * as Api from "../../services/api";
import DataTable from "./DataTable";
const CardList = () => {
  const [cardList, setCardList] = useState<any>([]);

  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getCards();
      if (res) {
        console.log(res.data.cards);
        setCardList(res.data.cards);
      }
    };
    init();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ borderRadius: 5, p: 3 }}>
        {cardList.length === 0 ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#EE2B70", fontWeight: 600 }}
          >
            No Cards Found!
          </Typography>
        ) : (
          <>
            {/* <DataTable cardList={cardList} /> */}
            <TableComp cardList={cardList} />
          </>
        )}
      </Card>
    </Container>
  );
};

export default CardList;

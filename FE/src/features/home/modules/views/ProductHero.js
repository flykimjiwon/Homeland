/* eslint-disable */
import * as React from "react";
import Button from "../components/Button";
import Typography from "../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import TextField from "@mui/material/TextField";
import mg from "./vc2.png";
import { Link } from "react-router-dom";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${mg})`,
        backgroundColor: "rgb(247,235,239)", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: "none" }} src={mg} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        비대면 술자리가 필요하신가요?
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        이런 공간이 있다면 어떨까요... 온라인 술자리도 오프라인 술자리 처럼 느낄
        수 있는 공간, 소중한 단짝 친구들과 바로 옆에 있는 듯한 느낌을 주는
        우리만의 공간. 더 쉽게, 매일 어울리고 즐겁게 술 마실 수 있는 그런 공간
        말이에요.
      </Typography>
      <Link to="/meeting-main">
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={{ minWidth: 200 }}
        >
          술자리입장
        </Button>
      </Link>

      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        온라인 술자리를 만나보세요
      </Typography>
    </ProductHeroLayout>
  );
}

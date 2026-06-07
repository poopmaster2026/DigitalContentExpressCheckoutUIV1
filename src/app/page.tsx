"use client";

import {
  CardView,
  AssetCard,
  CardPreview,
  Image,
  Content,
  Text,
} from "@react-spectrum/s2/CardView";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

// Minimal CardView demo to verify the @react-spectrum/s2 install renders.
// Design tokens / real content come later once the design is finalized.
export default function Home() {
  return (
    <main className={style({ padding: 24 })}>
      <h1 className={style({ font: "heading", marginBottom: 16 })}>CardView</h1>
      <CardView
        aria-label="Photo gallery"
        styles={style({ width: "full", height: 500 })}
        layout="grid"
        size="M"
      >
        <AssetCard>
          <CardPreview>
            <Image
              src="https://images.unsplash.com/photo-1705034598432-1694e203cdf3?q=80&w=600&auto=format&fit=crop"
              width={600}
              height={400}
            />
          </CardPreview>
          <Content>
            <Text slot="title">Desert Sunset</Text>
            <Text slot="description">PNG • 2/3/2024</Text>
          </Content>
        </AssetCard>

        <AssetCard>
          <CardPreview>
            <Image
              src="https://images.unsplash.com/photo-1722233987129-61dc344db8b6?q=80&w=600&auto=format&fit=crop"
              width={600}
              height={900}
            />
          </CardPreview>
          <Content>
            <Text slot="title">Hiking Trail</Text>
            <Text slot="description">JPEG • 1/10/2022</Text>
          </Content>
        </AssetCard>
      </CardView>
    </main>
  );
}

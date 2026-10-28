import { useState } from "react";
import { ArrowUpRight, CarFront } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { routePath, modelAsset } from "@/lib/paths";
import { formatRupiah } from "@/lib/format";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function ModelCard({ model }) {
  const [imageFailed, setImageFailed] = useState(false);
  const detailPath = routePath("model", { slug: model.slug });
  const statusText =
    model.status === "coming-soon"
      ? "Informasi menyusul"
      : model.status === "sold-out"
        ? "Stok habis"
        : null;

  return (
    <article
      className={`model-card${model.status === "sold-out" ? " sold-out" : ""}`}
    >
      <Card className="model-card-inner py-0 gap-0 ring-0">
        <Link
          className="model-image-link"
          to={detailPath}
          aria-label={`Lihat detail ${model.name}`}
        >
          <div className="model-image">
            {!imageFailed ? (
              <img
                src={modelAsset(model, model.images.card)}
                alt={model.name}
                width="800"
                height="500"
                loading="lazy"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <CarFront size={54} strokeWidth={1.2} aria-hidden="true" />
            )}
            <div className="model-badges">
              {model.promo && (
                <Badge className="badge badge-promo">{model.promo.label}</Badge>
              )}
              {statusText && <Badge className="badge">{statusText}</Badge>}
              <Badge className="badge badge-type">{model.type}</Badge>
            </div>
            <span className="image-arrow">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>
        <div className="model-card-body">
          <div className="model-card-copy">
            <h3>
              <Link to={detailPath}>{model.name}</Link>
            </h3>
            <p>{model.tagline}</p>
          </div>
          <div className="model-price">
            <span>
              {model.status === "coming-soon" ? "Harga menyusul" : "Mulai dari"}
            </span>
            {model.status !== "coming-soon" && (
              <strong>{formatRupiah(model.priceFrom)}</strong>
            )}
          </div>
          {model.promo?.note && (
            <p className="promo-note">{model.promo.note}</p>
          )}
          <div className="model-card-actions">
            <WhatsAppButton
              source="model-card"
              model={model}
              disabled={model.status === "sold-out"}
              className="card-chat"
            >
              {model.status === "coming-soon" ? "Tanya info" : "Tanya Oga"}
            </WhatsAppButton>
            <Link className="button button-outline card-detail" to={detailPath}>
              Detail
            </Link>
          </div>
        </div>
      </Card>
    </article>
  );
}

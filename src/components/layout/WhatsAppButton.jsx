import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export default function WhatsAppButton({
  model,
  variant,
  source,
  children = "Chat Oga di WhatsApp",
  extraMessage,
  className,
  iconOnly = false,
  disabled = false,
  onClick,
}) {
  const href = waLink(model, variant, extraMessage);
  const unavailable = !href || disabled;
  const content = (
    <>
      <MessageCircle aria-hidden="true" size={19} />
      {!iconOnly && (
        <span>
          {disabled ? "Stok habis" : href ? children : "WhatsApp belum diatur"}
        </span>
      )}
    </>
  );
  const classes = cn(
    "button button-wa",
    iconOnly && "button-icon-only",
    className,
  );

  if (unavailable) {
    return (
      <Button
        className={classes}
        disabled
        aria-label={disabled ? "Stok habis" : "WhatsApp belum diatur"}
        title={
          disabled
            ? "Model ini sedang tidak tersedia"
            : "Nomor WhatsApp belum tersedia"
        }
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      render={<a href={href} target="_blank" rel="noreferrer" />}
      className={classes}
      aria-label={iconOnly ? "Chat Oga lewat WhatsApp" : undefined}
      onClick={(event) => {
        trackEvent("click_whatsapp", {
          label: source,
          model: model?.slug ?? "",
          variant: variant?.id ?? "",
        });
        onClick?.(event);
      }}
    >
      {content}
    </Button>
  );
}

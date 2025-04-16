import Image, { type ImageProps } from "next/image"

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src: string | null | undefined
}

export default function SafeImage({ src, ...props }: SafeImageProps) {
  // Only render the Image component if src is a non-empty string
  if (!src || src.trim() === "") {
    return null
  }

  return <Image src={src || "/placeholder.svg"} {...props} />
}

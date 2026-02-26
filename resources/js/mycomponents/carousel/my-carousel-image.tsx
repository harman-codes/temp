import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export default function MyCarouselImage({
    images = [],
}: {
    images: string[] | null;
}) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <>
            {images &&
                images.length > 0 && (
                    <div className="mx-auto max-w-md overflow-hidden px-12">
                        <Carousel setApi={setApi} className="w-full max-w-md">
                            <CarouselContent>
                                {images
                                    .map((image, index) => (
                                        <CarouselItem key={index}>
                                            <Card>
                                                <CardContent className="flex aspect-video max-h-64 items-center justify-center p-1">
                                                    <div
                                                        className="h-full w-full bg-contain bg-center bg-no-repeat"
                                                        style={{
                                                            backgroundImage: `url(${image})`,
                                                        }}
                                                    ></div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                            <CarouselPrevious type="button" />
                            <CarouselNext type="button" />
                        </Carousel>
                        <div className="py-2 text-center text-sm text-muted-foreground">
                            {current} of {count}
                        </div>
                    </div>
                )}
        </>
    );
}

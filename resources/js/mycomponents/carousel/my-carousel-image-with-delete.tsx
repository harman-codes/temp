import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MyCarouselImageWithDelete({
    images = [],
}: {
    images: string[] | null;
}) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);


    const handleItemsToDelete = (image: string) => {
        if (images) {
            setItemsToDelete((prev) => [...prev, image]);
        }
    };

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

    // console.log(images.filter(item => !itemsToDelete.includes(item)));

    return (
        <>
            <input type="hidden" name="itemsToDelete" value={itemsToDelete} />
            {images && images.length > 0 && images.length > itemsToDelete.length && (
                <div className="mx-auto max-w-md">
                    <Carousel setApi={setApi} className="w-full max-w-md">
                        <CarouselContent>
                            {images.filter(item => !itemsToDelete.includes(item)).map((image, index) => (
                                <CarouselItem key={index}>
                                    <Card className="relative">
                                        <Button
                                            variant="ghost"
                                            type="button"
                                            className="absolute top-0.5 right-0.5 cursor-pointer hover:bg-transparent"
                                            onClick={() =>
                                                handleItemsToDelete(image)
                                            }
                                        >
                                            <X className="h-4 w-4 text-red-500" />
                                        </Button>
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
                    {/*<div className="py-2 text-center text-sm text-muted-foreground">*/}
                    {/*    {current} of {count}*/}
                    {/*</div>*/}
                </div>
            )}
        </>
    );
}

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppearanceLightDarkSwitch() {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        if (appearance === 'dark' || appearance === 'system') {
            return <Moon className="h-5 w-5" />;
        } else {
            return <Sun className="h-5 w-5" />;
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() =>
                updateAppearance(appearance === 'light' ? 'dark' : 'light')
            }
        >
            {getCurrentIcon()}
        </Button>
    );
}

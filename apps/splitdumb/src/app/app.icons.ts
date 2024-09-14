import { addIcons } from 'ionicons';
import { personCircle } from 'ionicons/icons';

export default function appIconsImporter(): () => Promise<void> {
    return () => new Promise((resolve) => {
        addIcons({
            personCircle,
        });
        resolve();
    });
}

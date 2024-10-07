import { addIcons } from 'ionicons';
import {
    add,
    addCircle,
    close,
    cog,
    folderOpen,
    home,
    listCircle,
    paperPlane,
    people,
    personCircle,
    pizzaOutline,
} from 'ionicons/icons';

export default function appIconsImporter(): () => Promise<void> {
    return () => new Promise((resolve) => {
        addIcons({
            personCircle,
            listCircle,
            home,
            paperPlane,
            pizzaOutline,
            people,
            cog,
            folderOpen,
            addCircle,
            add,
            close,
        });
        resolve();
    });
}

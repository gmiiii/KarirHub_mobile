import { MaterialIcons } from '@expo/vector-icons';
import { C } from '../theme';

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

export function Icon({
  name,
  size = 24,
  color = C.onSurface,
}: {
  name: MaterialIconName;
  size?: number;
  color?: string;
}) {
  return <MaterialIcons name={name} size={size} color={color} />;
}

export type { MaterialIconName };

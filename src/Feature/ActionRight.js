import { MENU_ACTIONS_RIGHT } from '../redux/constant';
import Button from '../components/Button';

function ActionRight({
    trendingContent /* check trendingContent will not render mic and like */,
}) {
    const onHandle = (item) => {
        // handle Action Right
        switch (item.type) {
            case 'mic':
                console.log('mic');
                break;
            case 'like':
                console.log('like');
                break;
            case 'more':
                console.log('more');
                break;
            default:
                console.log('default');
        }
    };
    const RenderFeatureRight = () => {
        const result = MENU_ACTIONS_RIGHT.map((item, index) => {
            if (!trendingContent) {
                return (
                    <Button
                        Icons={item.icon}
                        key={index}
                        extraTitle={item.title}
                        circle_hide
                        sizes="small"
                        onHandle={() => onHandle(item)}
                    />
                );
            } else {
                if (item.type === 'more') {
                    return (
                        <Button
                            Icons={item.icon}
                            key={index}
                            extraTitle={item.title}
                            circle_hide
                            sizes="big"
                            onHandle={() => onHandle(item)}
                        />
                    );
                }
            }
        });
        return result;
    };

    return <RenderFeatureRight />;
}

export default ActionRight;

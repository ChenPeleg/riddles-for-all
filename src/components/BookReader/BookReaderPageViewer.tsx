import React from 'react';
import RiddleCard from '../../components/RiddleCard';

type Props = {
    riddle: any;
};

export function BookReaderPageViewer({riddle}: Props) {
    return (<div>
            <RiddleCard riddle={riddle}/>
        </div>);
}

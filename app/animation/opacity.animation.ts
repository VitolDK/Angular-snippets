import { trigger, style, transition, animate, state } from '@angular/core';

export const OpacityAnimation = [
    trigger(
        'opacity',
        [
            state(':enter', style({ opacity: 0 })),
            state(':leave', style({ opacity: 0 })),
            transition(
                ':enter', [
                    style({opacity: 0}),
                    animate(250, style({opacity: 1}))
                ]
            ),
            transition(
                ':leave', [
                    style({opacity: 1}),
                    animate(250, style({opacity: 0}))
                ]
            )
        ]
    )
];

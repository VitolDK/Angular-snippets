import { trigger, style, transition, animate, state } from '@angular/core';

export const CollapseAnimation = [
    trigger(
        'collapse',
        [
            state(':enter', style({ 'overflow-y': 'hidden' })),
            state(':leave', style({ 'overflow-y': 'hidden' })),
            transition(
                ':enter', [
                    style({height: 0}),
                    animate(250, style({height: '*'}))
                ]
            ),
            transition(
                ':leave', [
                    style({height: '*'}),
                    animate(250, style({height: 0}))
                ]
            )
        ]
    )
];

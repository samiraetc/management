import React from 'react';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ILabelList {
  labels: Label[];
}

const LabelList = ({ labels }: ILabelList) => {
  const maxVisibleLabels = 2;
  const visibleLabels = labels.slice(0, maxVisibleLabels);
  const hiddenCount = labels.length - maxVisibleLabels;
  const hiddenLabels = labels.slice(maxVisibleLabels, labels.length);

  return (
    <div className="flex justify-end gap-1">
      {visibleLabels.map((label, index) => (
        <Badge
          variant="outline"
          key={index}
          className="flex items-center gap-2 py-1 text-sm font-normal text-stone-600 dark:text-white"
        >
          <div
            className="rounded-lg p-1.5"
            style={{ backgroundColor: label.color }}
          ></div>
          {label.name}
        </Badge>
      ))}
      {hiddenCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant="outline"
                className="flex items-center py-1 text-sm font-normal text-stone-600 dark:text-white"
              >
                <div className="flex">
                  {labels
                    .slice(maxVisibleLabels, maxVisibleLabels + 3)
                    .map((label, index: number) => (
                      <div
                        key={index}
                        className="size-2.5 rounded-full -ml-1 border-white border"
                        style={{ backgroundColor: label.color }}
                      />
                    ))}
                </div>
                <span className="ml-2">+{hiddenCount} labels</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
              {hiddenLabels.map((label) => (
                <div className="flex w-24 items-center gap-2 py-1 text-sm font-normal text-stone-700 dark:text-white">
                  <div
                    className="rounded-lg p-1.5 "
                    style={{ backgroundColor: label.color }}
                  ></div>
                  <p className="font-medium">{label.name}</p>
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default LabelList;

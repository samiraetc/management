import React from 'react';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';

interface ILabelList {
  labels: Label[];
}

const LabelList = ({ labels }: ILabelList) => {
  const MAX_VISIBLE_LABELS = 2;
  const visibleLabels = labels.slice(0, MAX_VISIBLE_LABELS);
  const hiddenCount = labels.length - MAX_VISIBLE_LABELS;
  const hiddenLabels = labels.slice(MAX_VISIBLE_LABELS, labels.length);
  const workspace = useSelector(
    (state: RootState) => state.workspace.workspace,
  );

  return (
    <div className="flex justify-end gap-1">
      {visibleLabels.map((label, index) => (
        <Link href={`/${workspace?.url_key}/label/${label.name}`}>
          <Badge
            variant="outline"
            key={index}
            className="flex cursor-pointer items-center gap-2 py-1 text-xs font-normal text-stone-600 dark:text-white"
          >
            <div
              className="rounded-lg p-1.5"
              style={{ backgroundColor: label.color }}
            ></div>
            {label.name}
          </Badge>
        </Link>
      ))}
      {hiddenCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant="outline"
                className="flex items-center py-1 text-xs font-normal text-stone-600 dark:text-white"
              >
                <div className="flex">
                  {labels
                    .slice(MAX_VISIBLE_LABELS, MAX_VISIBLE_LABELS + 3)
                    .map((label, index: number) => (
                      <div
                        key={index}
                        className="-ml-1 size-2.5 rounded-full border border-white"
                        style={{ backgroundColor: label.color }}
                      />
                    ))}
                </div>
                <span className="ml-2">+{hiddenCount} labels</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent sideOffset={6} className="w-44">
              {hiddenLabels.map((label, index) => (
                <Link
                  key={index}
                  href={`/${workspace?.url_key}/label/${label.name}`}
                  className="flex w-24 cursor-pointer items-center gap-2 py-1 text-sm font-normal text-stone-700 dark:text-white"
                >
                  <div
                    className="rounded-lg p-1.5"
                    style={{ backgroundColor: label.color }}
                  ></div>
                  <p className="font-medium">{label.name}</p>
                </Link>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default LabelList;

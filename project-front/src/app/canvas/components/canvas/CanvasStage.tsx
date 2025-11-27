"use client";

import type { Item } from "@/types/item";
import { getItemImageUrl } from "@/types/item";
import Konva from "konva";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Circle, Group, Image as KonvaImage, Layer, Line, Rect, Stage, Transformer } from "react-konva";
import useImage from "use-image";
import { useStageSize } from "./useStageSize";

export const CANVAS_DROPPABLE_ID = "canvas-droppable";

export type PlacedItem = {
  id: string;
  itemId: string;
  x: number;
  y: number;
  size: number;
  rotation?: number;
};

export type DropPreview = {
  itemId: string;
  x: number;
  y: number;
  size: number;
} | null;

type SelectionBox = {
  x: number;
  y: number;
  width: number;
  height: number;
} | null;

type CanvasStageProps = {
  photoDataUrl: string;
  placedItems: PlacedItem[];
  itemsById: Record<string, Item>;
  onMoveItem: (id: string, pos: { x: number; y: number }) => void;
  onUpdateItem: (id: string, updates: Partial<PlacedItem>) => void;
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onDeleteSelected: () => void;
  dropPreview: DropPreview;
  isDraggingFromPalette: boolean;
  stageRef: RefObject<Konva.Stage | null>;
  onMoveMultiple: (ids: string[], delta: { dx: number; dy: number }) => void;
};

function getCoverFit(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number
): { x: number; y: number; width: number; height: number } {
  if (
    containerWidth === 0 ||
    containerHeight === 0 ||
    imageWidth === 0 ||
    imageHeight === 0
  ) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const containerRatio = containerWidth / containerHeight;
  const imageRatio = imageWidth / imageHeight;

  let width: number;
  let height: number;

  if (imageRatio > containerRatio) {
    height = containerHeight;
    width = imageWidth * (containerHeight / imageHeight);
  } else {
    width = containerWidth;
    height = imageHeight * (containerWidth / imageWidth);
  }

  const x = (containerWidth - width) / 2;
  const y = (containerHeight - height) / 2;

  return { x, y, width, height };
}

function clampPosition(
  x: number,
  y: number,
  size: number,
  stageWidth: number,
  stageHeight: number
): { x: number; y: number } {
  return {
    x: Math.max(0, Math.min(x, stageWidth - size)),
    y: Math.max(0, Math.min(y, stageHeight - size)),
  };
}

type DropPreviewImageProps = {
  preview: NonNullable<DropPreview>;
  itemsById: Record<string, Item>;
};

function DropPreviewImage({ preview, itemsById }: DropPreviewImageProps) {
  const item = itemsById[preview.itemId];
  const [image] = useImage(item ? getItemImageUrl(item) : "", "anonymous");

  if (!image) {
    return null;
  }

  return (
    <KonvaImage
      image={image}
      x={preview.x}
      y={preview.y}
      width={preview.size}
      height={preview.size}
      opacity={0.5}
      listening={false}
      shadowColor="rgba(124, 58, 237, 0.5)"
      shadowBlur={10}
      shadowOffset={{ x: 0, y: 0 }}
    />
  );
}

type PlacedJewelProps = {
  placed: PlacedItem;
  item: Item;
  isSelected: boolean;
  onSelect: (id: string, node: Konva.Image, addToSelection: boolean) => void;
  onChange: (id: string, updates: Partial<PlacedItem>) => void;
  stageSize: { width: number; height: number };
  onDragStart: (id: string) => void;
  onDragMoveMultiple: (id: string, delta: { dx: number; dy: number }) => void;
  onDragEnd: (id: string) => void;
  onDeleteItem: () => void;
};

function PlacedJewel({
  placed,
  item,
  isSelected,
  onSelect,
  onChange,
  stageSize,
  onDragStart,
  onDragMoveMultiple,
  onDragEnd,
  onDeleteItem,
}: PlacedJewelProps) {
  const [image] = useImage(getItemImageUrl(item), "anonymous");
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastDragPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  if (!image) {
    return null;
  }

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    dragStartPosRef.current = { x: node.x(), y: node.y() };
    lastDragPosRef.current = { x: node.x(), y: node.y() };
    onDragStart(placed.id);
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    
    const dx = node.x() - lastDragPosRef.current.x;
    const dy = node.y() - lastDragPosRef.current.y;
    
    lastDragPosRef.current = { x: node.x(), y: node.y() };
    
    if (dx !== 0 || dy !== 0) {
      onDragMoveMultiple(placed.id, { dx, dy });
    }
    
    const topLeftX = node.x() - placed.size / 2;
    const topLeftY = node.y() - placed.size / 2;
    const { x, y } = clampPosition(
      topLeftX,
      topLeftY,
      placed.size,
      stageSize.width,
      stageSize.height
    );
    node.x(x + placed.size / 2);
    node.y(y + placed.size / 2);
  };

  const handleDragEndLocal = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    
    const topLeftX = node.x() - placed.size / 2;
    const topLeftY = node.y() - placed.size / 2;
    const { x, y } = clampPosition(
      topLeftX,
      topLeftY,
      placed.size,
      stageSize.width,
      stageSize.height
    );
    onChange(placed.id, { x, y });
    onDragEnd(placed.id);
  };

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    const node = e.target as Konva.Image;
    const addToSelection = (e.evt as MouseEvent).shiftKey || (e.evt as MouseEvent).ctrlKey || (e.evt as MouseEvent).metaKey;
    onSelect(placed.id, node, addToSelection);
  };

  const handleTransformEnd = () => {
    const node = imageRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const nextSize = Math.max(20, placed.size * scaleX);

    node.scaleX(1);
    node.scaleY(1);

    const currentCenterX = node.x();
    const currentCenterY = node.y();
    
    const topLeftX = currentCenterX - nextSize / 2;
    const topLeftY = currentCenterY - nextSize / 2;

    const { x, y } = clampPosition(
      topLeftX,
      topLeftY,
      nextSize,
      stageSize.width,
      stageSize.height
    );

    onChange(placed.id, {
      x,
      y,
      size: nextSize,
      rotation: node.rotation(),
    });
  };

  return (
    <Group>
      <KonvaImage
        ref={imageRef}
        image={image}
        x={placed.x + placed.size / 2}
        y={placed.y + placed.size / 2}
        width={placed.size}
        height={placed.size}
        rotation={placed.rotation ?? 0}
        draggable
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEndLocal}
        onTransformEnd={handleTransformEnd}
        offsetX={placed.size / 2}
        offsetY={placed.size / 2}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          keepRatio={true}
          rotateEnabled={true}
          anchorSize={8}
          anchorCornerRadius={2}
          anchorStroke="#7c3aed"
          anchorFill="#ffffff"
          anchorStrokeWidth={1.5}
          borderStroke="#7c3aed"
          borderStrokeWidth={1.5}
          borderDash={[]}
          rotateAnchorOffset={20}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Group>
  );
}

export function CanvasStage({
  photoDataUrl,
  placedItems,
  itemsById,
  onMoveItem,
  onUpdateItem,
  selectedIds,
  onSelect,
  onDeleteSelected,
  dropPreview,
  isDraggingFromPalette,
  stageRef,
  onMoveMultiple,
}: CanvasStageProps) {
  const { containerRef, size } = useStageSize();
  const [image, imageStatus] = useImage(photoDataUrl);

  const [deleteButtonPos, setDeleteButtonPos] = useState<{ x: number; y: number } | null>(null);

  const [selectionBox, setSelectionBox] = useState<SelectionBox>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const selectionStartRef = useRef<{ x: number; y: number } | null>(null);

  const draggingItemRef = useRef<string | null>(null);

  const handleSelect = useCallback(
    (id: string, node: Konva.Image, addToSelection: boolean) => {
      if (addToSelection) {
        if (selectedIds.includes(id)) {
          onSelect(selectedIds.filter(sid => sid !== id));
        } else {
          onSelect([...selectedIds, id]);
        }
      } else {
        onSelect([id]);
      }
    },
    [onSelect, selectedIds]
  );

  const handleStageMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const clickedOnBackground = e.target.getLayer()?.children?.[0] === e.target;
      
      if (clickedOnEmpty || clickedOnBackground) {
        const stage = e.target.getStage();
        if (!stage) return;
        
        const pos = stage.getPointerPosition();
        if (!pos) return;
        
        selectionStartRef.current = pos;
        setIsSelecting(true);
        setSelectionBox({ x: pos.x, y: pos.y, width: 0, height: 0 });
        
        const mouseEvent = e.evt as MouseEvent;
        if (!mouseEvent.shiftKey && !mouseEvent.ctrlKey && !mouseEvent.metaKey) {
          onSelect([]);
          setDeleteButtonPos(null);
        }
      }
    },
    [onSelect]
  );

  const handleStageMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!isSelecting || !selectionStartRef.current) return;
      
      const stage = e.target.getStage();
      if (!stage) return;
      
      const pos = stage.getPointerPosition();
      if (!pos) return;
      
      const start = selectionStartRef.current;
      setSelectionBox({
        x: Math.min(start.x, pos.x),
        y: Math.min(start.y, pos.y),
        width: Math.abs(pos.x - start.x),
        height: Math.abs(pos.y - start.y),
      });
    },
    [isSelecting]
  );

  const handleStageMouseUp = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!isSelecting || !selectionBox) {
        setIsSelecting(false);
        setSelectionBox(null);
        selectionStartRef.current = null;
        return;
      }
      
      const newSelectedIds: string[] = [];
      
      placedItems.forEach((placed) => {
        const itemCenterX = placed.x + placed.size / 2;
        const itemCenterY = placed.y + placed.size / 2;
        const itemLeft = placed.x;
        const itemTop = placed.y;
        const itemRight = placed.x + placed.size;
        const itemBottom = placed.y + placed.size;
        
        const boxRight = selectionBox.x + selectionBox.width;
        const boxBottom = selectionBox.y + selectionBox.height;
        
        const intersects = 
          itemLeft < boxRight &&
          itemRight > selectionBox.x &&
          itemTop < boxBottom &&
          itemBottom > selectionBox.y;
        
        if (intersects) {
          newSelectedIds.push(placed.id);
        }
      });
      
      const mouseEvent = e.evt as MouseEvent;
      if (mouseEvent.shiftKey || mouseEvent.ctrlKey || mouseEvent.metaKey) {
        const combined = [...new Set([...selectedIds, ...newSelectedIds])];
        onSelect(combined);
      } else if (newSelectedIds.length > 0) {
        onSelect(newSelectedIds);
      }
      
      setIsSelecting(false);
      setSelectionBox(null);
      selectionStartRef.current = null;
    },
    [isSelecting, selectionBox, placedItems, selectedIds, onSelect]
  );

  const handleItemDragStart = useCallback((id: string) => {
    draggingItemRef.current = id;
  }, []);

  const handleItemDragMoveMultiple = useCallback((id: string, delta: { dx: number; dy: number }) => {
    if (selectedIds.length > 1 && selectedIds.includes(id)) {
      const otherIds = selectedIds.filter(sid => sid !== id);
      if (otherIds.length > 0) {
        onMoveMultiple(otherIds, delta);
      }
    }
  }, [selectedIds, onMoveMultiple]);

  const handleItemDragEnd = useCallback((id: string) => {
    draggingItemRef.current = null;
  }, []);

  const updateDeleteButtonPosition = useCallback(() => {
    if (selectedIds.length === 0) {
      setDeleteButtonPos(null);
      return;
    }

    const firstSelectedId = selectedIds[0];
    const firstSelected = placedItems.find(p => p.id === firstSelectedId);
    if (firstSelected) {
      const rotation = (firstSelected.rotation ?? 0) * Math.PI / 180;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const halfSize = firstSelected.size / 2;
      
      const cornerX = firstSelected.x + halfSize + (halfSize * cos - (-halfSize) * sin);
      const cornerY = firstSelected.y + halfSize + (halfSize * sin + (-halfSize) * cos);
      
      setDeleteButtonPos({
        x: cornerX + 8,
        y: cornerY - 8,
      });
    }
  }, [selectedIds, placedItems]);

  const handleDeleteClick = useCallback(() => {
    onDeleteSelected();
    setDeleteButtonPos(null);
  }, [onDeleteSelected]);

  useEffect(() => {
    if (selectedIds.length > 0) {
      setTimeout(updateDeleteButtonPosition, 0);
    } else {
      setDeleteButtonPos(null);
    }
  }, [selectedIds, updateDeleteButtonPosition]);

  const photoFit = useMemo(() => {
    if (!image || size.width === 0 || size.height === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    return getCoverFit(size.width, size.height, image.width, image.height);
  }, [image, size.width, size.height]);

  const isLoading = imageStatus === "loading";
  const hasError = imageStatus === "failed";

  return (
    <div
      ref={containerRef}
      id={CANVAS_DROPPABLE_ID}
      className="relative h-full w-full min-h-[520px]"
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
            <p className="text-sm text-gray-500">Loading canvas...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-red-500">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Konva Stage - only render when we have valid dimensions */}
      {size.width > 0 && size.height > 0 && (
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          onMouseDown={handleStageMouseDown}
          onMouseMove={handleStageMouseMove}
          onMouseUp={handleStageMouseUp}
          onTouchStart={handleStageMouseDown}
          onTouchMove={handleStageMouseMove}
          onTouchEnd={handleStageMouseUp}
        >
          {/* Background Layer - Photo */}
          <Layer>
            {image && (
              <KonvaImage
                image={image}
                x={photoFit.x}
                y={photoFit.y}
                width={photoFit.width}
                height={photoFit.height}
                listening={true}
              />
            )}
          </Layer>

          {/* Jewels Layer - Placed items + Transformer */}
          <Layer>
            {/* Drop preview shadow - only shows when dragging from palette */}
            {isDraggingFromPalette && dropPreview && <DropPreviewImage preview={dropPreview} itemsById={itemsById} />}

            {placedItems.map((placed) => {
              const item = itemsById[placed.itemId];
              if (!item) return null;
              return (
                <PlacedJewel
                  key={placed.id}
                  placed={placed}
                  item={item}
                  isSelected={selectedIds.includes(placed.id)}
                  onSelect={handleSelect}
                  onChange={onUpdateItem}
                  stageSize={size}
                  onDragStart={handleItemDragStart}
                  onDragMoveMultiple={handleItemDragMoveMultiple}
                  onDragEnd={handleItemDragEnd}
                  onDeleteItem={onDeleteSelected}
                />
              );
            })}

            {/* Delete button - positioned at top-right of selection (for single selection) */}
            {deleteButtonPos && selectedIds.length === 1 && (
              <Group
                x={deleteButtonPos.x}
                y={deleteButtonPos.y}
                onClick={handleDeleteClick}
                onTap={handleDeleteClick}
              >
                {/* Circle background */}
                <Circle
                  radius={12}
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth={2}
                  shadowColor="rgba(0,0,0,0.3)"
                  shadowBlur={4}
                  shadowOffsetY={2}
                />
                {/* X icon - two crossed lines */}
                <Line
                  points={[-4, -4, 4, 4]}
                  stroke="#ffffff"
                  strokeWidth={2}
                  lineCap="round"
                />
                <Line
                  points={[4, -4, -4, 4]}
                  stroke="#ffffff"
                  strokeWidth={2}
                  lineCap="round"
                />
              </Group>
            )}

            {/* Marquee selection box */}
            {selectionBox && selectionBox.width > 0 && selectionBox.height > 0 && (
              <Rect
                x={selectionBox.x}
                y={selectionBox.y}
                width={selectionBox.width}
                height={selectionBox.height}
                fill="rgba(124, 58, 237, 0.1)"
                stroke="#7c3aed"
                strokeWidth={1}
                dash={[4, 4]}
                listening={false}
              />
            )}
          </Layer>

          {/* TODO Phase 7: Save session to backend */}
          {/* TODO Phase 8: Export final image */}
        </Stage>
      )}
    </div>
  );
}
